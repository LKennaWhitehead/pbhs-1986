export const events = [
  {
    id: 'meet-greet',
    day: 'friday',
    dayLabel: 'Friday · Oct 30',
    title: 'Meet & Greet',
    location: 'PBHS Student Union / Cafeteria',
    time: '5:30 PM – 6:30 PM',
    attire: 'Reunion T-Shirt',
    description:
      'Kick off reunion weekend reconnecting with classmates, sharing memories, and enjoying an evening of fellowship and fun.',
  },
  {
    id: 'football-game',
    day: 'friday',
    dayLabel: 'Friday · Oct 30',
    title: 'Friday Night Lights — Football Game & Zebra Spirit',
    location: 'Pine Bluff High School Football Field',
    time: 'Kickoff 7:00 PM',
    attire: 'Show your Zebra Pride!',
    description:
      "Nothing says reunion weekend like Friday night lights and Zebra pride! We'll head to the football game after the Meet and Greet. Come enjoy the game, celebrate with classmates, and help bring the energy as we cheer those Fighting Zebras to victory.",
    alert:
      'Football game tickets are not included with reunion registration and must be purchased individually.',
    alertType: 'warning',
  },
  {
    id: 'brunch',
    day: 'saturday',
    dayLabel: 'Saturday · Oct 31',
    title: 'Day Party Brunch Celebration',
    location: 'Pine Bluff Country Club · 1 Country Club Lane, Pine Bluff, AR 71603',
    time: '11:00 AM – 2:00 PM',
    attire: 'Black & White with a touch of Red',
    description:
      'Join us for an afternoon of food, music, laughter, fellowship, and Mighty Zebra pride as we celebrate 40 years together in style! Enjoy great memories, fun photo moments, our exciting Silent Auction, special recognition moments, and a heartfelt tribute honoring classmates who will always remain part of our Zebra family.',
    highlights: ['Silent Auction', 'Special Recognition', 'Memorial Tribute'],
  },
  {
    id: 'blue-jeans',
    day: 'saturday',
    dayLabel: 'Saturday · Oct 31',
    title: 'Blue Jeans & Bling Celebration',
    location: 'Venue TBD',
    time: '7:00 PM – 11:00 PM',
    attire: 'Blue Jeans & Bling',
    description:
      'Keep the reunion weekend going with a night of music, laughter, dancing, fellowship, and unforgettable memories with your Mighty Zebra family! Come relaxed, stylish, and ready to celebrate as we enjoy great vibes, reconnect with classmates, and party the night away.',
  },
  {
    id: 'farewell',
    day: 'sunday',
    dayLabel: 'Sunday · Nov 1',
    title: 'Farewell Fellowship',
    location: 'TBA',
    time: 'TBA',
    description:
      "Close out reunion weekend with fellowship, reflection, gratitude, and one final opportunity to reconnect with classmates before departure. Let's celebrate the memories we've shared, the friendships that have lasted through the years, and the lasting spirit of the Mighty Zebras.",
    alert: 'Additional details regarding Sunday activities will be announced soon.',
    alertType: 'info',
    comingSoon: true,
  },
]

export const eventsByDay = {
  friday: events.filter((e) => e.day === 'friday'),
  saturday: events.filter((e) => e.day === 'saturday'),
  sunday: events.filter((e) => e.day === 'sunday'),
}
