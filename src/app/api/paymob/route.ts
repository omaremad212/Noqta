import { NextRequest, NextResponse } from 'next/server';

/**
 * Paymob Payment Intentions API
 * Docs: https://developers.paymob.com/egypt/docs/payment-intention
 *
 * Required env vars (set in .env.local):
 *   PAYMOB_SECRET_KEY   — egy_sk_live_...
 *   PAYMOB_PUBLIC_KEY   — egy_pk_live_...
 *   PAYMOB_INTEGRATION_ID — numeric integration ID
 */

const SECRET_KEY      = process.env.PAYMOB_SECRET_KEY ?? '';
const PUBLIC_KEY      = process.env.PAYMOB_PUBLIC_KEY ?? '';
const INTEGRATION_ID  = process.env.PAYMOB_INTEGRATION_ID ?? '';

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

export async function POST(req: NextRequest) {
  if (!SECRET_KEY || !PUBLIC_KEY || !INTEGRATION_ID) {
    return NextResponse.json(
      { error: 'Paymob credentials not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { items, total, customer } = body as {
      items: OrderItem[];
      total: number;
      customer: CustomerInfo;
    };

    const amountCents = Math.round(total * 100);
    const nameParts   = customer.fullName.trim().split(' ');
    const firstName   = nameParts[0] ?? 'Customer';
    const lastName    = nameParts.slice(1).join(' ') || 'N/A';

    // Create Payment Intention
    const intentionRes = await fetch('https://accept.paymob.com/v1/intention/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amountCents,
        currency: 'EGP',
        payment_methods: [parseInt(INTEGRATION_ID, 10)],
        items: items.map((i) => ({
          name: i.name,
          amount: Math.round(i.price * 100),
          description: i.name,
          quantity: i.quantity,
        })),
        billing_data: {
          first_name:      firstName,
          last_name:       lastName,
          phone_number:    customer.phone,
          email:           'NA',
          apartment:       'NA',
          floor:           'NA',
          street:          customer.address,
          building:        'NA',
          shipping_method: 'NA',
          postal_code:     'NA',
          city:            customer.city,
          country:         'EG',
          state:           customer.city,
        },
        customer: {
          first_name:   firstName,
          last_name:    lastName,
          email:        'noreply@noqtadesigns.com',
          extras: { re_ref: 'noqta_web' },
        },
        extras: { re_ref: 'noqta_web' },
      }),
    });

    if (!intentionRes.ok) {
      const err = await intentionRes.text();
      console.error('[Paymob] Intention failed:', err);
      return NextResponse.json({ error: 'Failed to create payment intention' }, { status: 502 });
    }

    const intention = await intentionRes.json();
    const clientSecret: string = intention.client_secret;

    if (!clientSecret) {
      console.error('[Paymob] No client_secret in response:', intention);
      return NextResponse.json({ error: 'Invalid Paymob response' }, { status: 502 });
    }

    const paymentUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${PUBLIC_KEY}&clientSecret=${clientSecret}`;

    return NextResponse.json({ paymentUrl });
  } catch (err) {
    console.error('[Paymob]', err);
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
