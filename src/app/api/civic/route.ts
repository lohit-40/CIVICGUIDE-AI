import { NextResponse } from 'next/server';

function getDemoData(address: string) {
  return {
    election: { name: 'Example General Election', electionDay: '2024-11-05' },
    pollingLocations: [
      {
        address: { locationName: 'City Community Center', line1: '100 Democracy Ave', city: 'Your City', state: 'ST', zip: '00001' },
        hours: '7:00 AM – 8:00 PM',
        notes: 'Accessible entrance on north side. Parking available.'
      },
      {
        address: { locationName: 'Public Library – Main Branch', line1: '200 Civic Blvd', city: 'Your City', state: 'ST', zip: '00002' },
        hours: '7:00 AM – 8:00 PM',
        notes: 'Wheelchair accessible.'
      }
    ],
    state: [{
      name: 'Your State',
      electionAdministrationBody: {
        name: 'State Board of Elections',
        electionInfoUrl: 'https://vote.gov',
        registrationUrl: 'https://vote.gov/register',
        votingLocationFinderUrl: 'https://vote.gov'
      }
    }]
  };
}

export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    
    if (!address) {
      return NextResponse.json({ error: 'Address is required.' }, { status: 400 });
    }

    const apiKey = process.env.CIVIC_API_KEY;

    if (!apiKey) {
      // Return demo data if no key is configured
      return NextResponse.json({ demo: true, data: getDemoData(address) });
    }

    const url = `https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${encodeURIComponent(address)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ demo: true, data: getDemoData(address) });
    }

    const data = await response.json();
    return NextResponse.json({ demo: false, data });

  } catch (error) {
    console.error('Civic API error:', error);
    return NextResponse.json({ demo: true, data: getDemoData('') });
  }
}
