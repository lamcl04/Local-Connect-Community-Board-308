export type Category = 'Food & Goods' | 'Volunteer Labor' | 'Supplies' | 'Marketing';
export type Logistics = 'Pick-up Available' | 'Drop-off Required';

export type LocalRequest = {
  id: string;
  organizationName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  title: string;
  description: string;
  category: Category;
  quantityNeeded: string;
  timeframe: string;
  logistics: Logistics;
  requirements: string[];
  isUrgent: boolean;
};

export const localRequests: LocalRequest[] = [
  {
    id: 'harrisonburg-food-pantry',
    organizationName: 'Blue Ridge Area Food Bank',
    contactPerson: 'Maya Patel',
    contactEmail: 'maya@brafb.org',
    contactPhone: '(540) 434-0789',
    title: 'Shelf-stable groceries for weekend boxes',
    description: 'Our Saturday distribution is short on pantry staples for families across Harrisonburg and Rockingham County. Businesses can sponsor a full item, a case, or a small team collection.',
    category: 'Food & Goods',
    quantityNeeded: '120 cans of vegetables + 80 jars of pasta sauce',
    timeframe: 'Needed by Friday, June 14',
    logistics: 'Pick-up Available',
    requirements: ['Unopened', 'Not expired', 'No glass preferred'],
    isUrgent: true,
  },
  {
    id: 'big-brothers-garden',
    organizationName: 'Massanutten Community Garden',
    contactPerson: 'Jared Mullins',
    contactEmail: 'jared@massgarden.org',
    contactPhone: '(540) 434-2281',
    title: 'Saturday crew to prep new garden beds',
    description: 'Help us turn a sunny corner of the community garden into six new growing beds for neighbors. A cheerful crew and a little muscle will make quick work of this project.',
    category: 'Volunteer Labor',
    quantityNeeded: '8 volunteers for a 3-hour shift',
    timeframe: 'Saturday, June 15 · 9:00 AM–12:00 PM',
    logistics: 'Drop-off Required',
    requirements: ['Closed-toe shoes', 'Gloves if available', 'Age 16+'],
    isUrgent: false,
  },
  {
    id: 'newtown-classroom',
    organizationName: 'Newtown Schoolhouse',
    contactPerson: 'Elena Torres',
    contactEmail: 'elena@newtownschoolhouse.org',
    contactPhone: '(540) 433-9912',
    title: 'Art supplies for summer learning labs',
    description: 'Our summer learning labs give local middle schoolers a place to make, explore, and stay curious. We are gathering everyday materials for 40 hands-on art kits.',
    category: 'Supplies',
    quantityNeeded: '40 kits: markers, sketchbooks, glue, and scissors',
    timeframe: 'By Monday, June 24',
    logistics: 'Pick-up Available',
    requirements: ['New supplies only', 'Kid-safe', 'Bulk donations welcome'],
    isUrgent: false,
  },
  {
    id: 'valley-housing',
    organizationName: 'Valley Mission',
    contactPerson: 'Andre Lewis',
    contactEmail: 'andre@valleymission.org',
    contactPhone: '(540) 564-3400',
    title: 'Move-in kits for neighbors finding housing',
    description: 'Fresh starts deserve a soft landing. We are assembling simple move-in kits with towels, laundry supplies, and kitchen basics for residents moving into stable housing.',
    category: 'Supplies',
    quantityNeeded: '18 kits, approximately $45 each',
    timeframe: 'Needed within the next two weeks',
    logistics: 'Pick-up Available',
    requirements: ['New or like-new', 'No large appliances', 'Allergen-free items'],
    isUrgent: true,
  },
  {
    id: 'harrisonburg-cares',
    organizationName: 'Harrisonburg Cares',
    contactPerson: 'Nina Walker',
    contactEmail: 'nina@harrisonburgcares.org',
    contactPhone: '(540) 820-4456',
    title: 'Local business partner for summer resource guide',
    description: 'We are printing a pocket-sized resource guide that connects neighbors to food, shelter, health, and legal support. A local sponsor can help us get it into more hands.',
    category: 'Marketing',
    quantityNeeded: '1 print sponsor or 3 distribution partners',
    timeframe: 'Design finalizes June 21',
    logistics: 'Drop-off Required',
    requirements: ['Harrisonburg-based', 'Community-minded', 'Print or distribution support'],
    isUrgent: false,
  },
  {
    id: 'sunrise-shelter',
    organizationName: 'Our Community Place',
    contactPerson: 'Chris Nguyen',
    contactEmail: 'chris@ourcommunityplace.org',
    contactPhone: '(540) 434-8900',
    title: 'Breakfast service volunteers',
    description: 'Our morning table is a place to start the day with dignity. We need a small, reliable team to set up, serve, and reset during the busiest week of the month.',
    category: 'Volunteer Labor',
    quantityNeeded: '5 volunteers each morning, Monday–Friday',
    timeframe: 'June 17–21 · 6:30–9:30 AM',
    logistics: 'Drop-off Required',
    requirements: ['Food-safe habits', 'Brief orientation', 'Dependable arrival'],
    isUrgent: true,
  },
  {
    id: 'harrisonburg-habitat',
    organizationName: 'Habitat for Humanity SV',
    contactPerson: 'Rosa Kim',
    contactEmail: 'rosa@habitatsv.org',
    contactPhone: '(540) 434-9586',
    title: 'Lumber and fasteners for a porch build',
    description: 'A family home build is at the porch stage, and a donated materials order will keep our volunteers moving. Contractors and hardware suppliers are especially welcome.',
    category: 'Supplies',
    quantityNeeded: '24 treated 2x6s, 80 deck screws, 12 joist hangers',
    timeframe: 'By Wednesday, June 19',
    logistics: 'Pick-up Available',
    requirements: ['New materials', 'Weather-rated lumber', 'Delivery coordination'],
    isUrgent: false,
  },
  {
    id: 'shandoah-literacy',
    organizationName: 'Shenandoah Valley Literacy Council',
    contactPerson: 'Paula Reyes',
    contactEmail: 'paula@svliteracy.org',
    contactPhone: '(540) 433-6487',
    title: 'Photographer for learner celebration',
    description: 'Our learners will celebrate new reading milestones with family and tutors. We are looking for a kind local photographer who can capture the evening and share a small digital gallery.',
    category: 'Marketing',
    quantityNeeded: '1 photographer for a 2-hour event',
    timeframe: 'Thursday, June 27 · 6:00–8:00 PM',
    logistics: 'Drop-off Required',
    requirements: ['Local portfolio', 'Consent-aware', 'Digital delivery'],
    isUrgent: false,
  },
];