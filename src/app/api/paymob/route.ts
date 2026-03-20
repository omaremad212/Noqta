import { NextRequest, NextResponse } from 'next/server';

/**
 * Paymob Payment Integration
 *
 * To activate online payment:
 * 1. Create a Paymob account at https://paymob.com
 * 2. Get your API key and Integration ID from the dashboard
 * 3. Set environment variables in .env.local:
 *    PAYMOB_API_KEY=your_api_key_here
 *    PAYMOB_INTEGRATION_ID=your_integration_id
 *    PAYMOB_IFRAME_ID=your_iframe_id
 *
 * Flow: Auth → Create Order → Payment Key → Redirect to iframe
 */

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY ?? '';
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID ?? '';
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID ?? '';
const PAYMOB_BASE_URL = 'https://accept.paymob.com/api';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

async function authenticate(): Promise<string> {
  const res = await fetch(`${PAYMOB_BASE_URL}/auth/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
  });
  const data = await res.json();
  if (!data.token) throw new Error('Paymob auth failed');
  return data.token as string;
}

async function createOrder(token: string, items: OrderItem[], totalCents: number): Promise<number> {
  const res = await fetch(`${PAYMOB_BASE_URL}/ecommerce/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: false,
      amount_cents: totalCents,
      currency: 'EGP',
      items: items.map((i) => ({
        name: i.name,
        amount_cents: Math.round(i.price * 100),
        description: i.name,
        quantity: i.quantity,
      })),
    }),
  });
  const data = await res.json();
  return data.id as number;
}

async function getPaymentKey(
  token: string,
  orderId: number,
  totalCents: number,
  customer: CustomerInfo
): Promise<string> {
  const nameParts = customer.fullName.trim().split(' ');
  const firstName = nameParts[0] ?? 'Customer';
  const lastName = nameParts.slice(1).join(' ') || 'N/A';

  const res = await fetch(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: totalCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: customer.phone,
        email: 'NA',
        apartment: 'NA',
        floor: 'NA',
        street: customer.address,
        building: 'NA',
        shipping_method: 'NA',
        postal_code: 'NA',
        city: customer.city,
        country: 'EG',
        state: customer.city,
      },
      currency: 'EGP',
      integration_id: parseInt(PAYMOB_INTEGRATION_ID, 10),
    }),
  });
  const data = await res.json();
  return data.token as string;
}

export async function POST(req: NextRequest) {
  try {
    if (!PAYMOB_API_KEY || !PAYMOB_INTEGRATION_ID || !PAYMOB_IFRAME_ID) {
      return NextResponse.json(
        { error: 'Paymob credentials not configured. Set PAYMOB_API_KEY, PAYMOB_INTEGRATION_ID, and PAYMOB_IFRAME_ID in .env.local' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { items, total, customer } = body as {
      items: OrderItem[];
      total: number;
      customer: CustomerInfo;
    };

    const totalCents = Math.round(total * 100);

    // Step 1: Authenticate
    const token = await authenticate();

    // Step 2: Create order
    const orderId = await createOrder(token, items, totalCents);

    // Step 3: Get payment key
    const paymentKey = await getPaymentKey(token, orderId, totalCents, customer);

    // Step 4: Return iframe URL
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;

    return NextResponse.json({ paymentUrl: iframeUrl, orderId });
  } catch (err) {
    console.error('[Paymob]', err);
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
