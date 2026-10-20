export const NEWS_TEASERS = [
  {
    id: 'raclette',
    label: 'Competition',
    title: 'Win a raclette grill for your next gathering',
    image: 'raclette.png',
    imageAlt: 'Raclette grills with melted cheese, potatoes and cornichons on a red table.',
    introduction: 'Good food tastes even better together. Make your next evening around the table a little more special with a raclette grill to share.',
    heading: 'Everything for a cozy raclette night',
    description: 'From creamy Swiss cheese to small potatoes and crunchy pickles, find the little extras that turn a simple meal into an occasion.',
    note: 'This sample competition is a preview. Entries are not open in this prototype.',
    action: 'Explore raclette essentials',
    destination: '/products/categories',
  },
  {
    id: 'autumn',
    label: 'In season',
    title: 'Fresh ideas for cozy autumn meals',
    image: 'autumn.png',
    imageAlt: 'Pumpkin soup with seeds, roasted squash, bread and sage on a cream linen table.',
    introduction: 'A bowl of pumpkin soup, warm bread and a quiet moment at home. Bring the colors and flavors of autumn to your table.',
    heading: 'Simple ingredients, comforting meals',
    description: 'Roast squash with a little olive oil and sage, blend it into a silky soup, and finish with toasted pumpkin seeds. Serve with your favorite crusty bread.',
    action: 'Browse seasonal ingredients',
    destination: '/products/categories',
  },
  {
    id: 'new-products',
    label: 'New arrivals',
    title: 'Discover what’s new at Migros',
    image: 'new-products.png',
    imageAlt: 'A colorful grocery assortment with oat drink, granola, yoghurt, pasta and fresh produce.',
    introduction: 'A new breakfast favorite or something different for dinner? There is always a little more to discover in our range.',
    heading: 'Meet your next favorites',
    description: 'Explore the latest additions to our assortment, from everyday essentials to a few delicious surprises. Find something new for your next basket.',
    action: 'Explore new products',
    destination: '/products/new',
  },
]

export const SCRATCH_WIN_TEASER = {
  id: 'scratch-win',
  title: 'Scratch & Win — a little extra for your shop',
  image: 'scratch-win.png',
  imageAlt: 'An orange and cream scratch card with a silver scratch area beside a small gift box.',
  to: '/scratch-win',
}

export const campaignImage = (filename: string) => `${import.meta.env.BASE_URL}images/campaigns/${filename}`
