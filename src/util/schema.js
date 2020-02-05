import classification from './classification';

export default [
  {
    id: 'name',
    label: 'Name',
    show: true,
    sample: 'Timecrimes',
  },
  {
    id: 'year',
    label: 'Year',
    type: 'year',
    show: true,
    sample: 2007,
  },
  {
    id: 'genre',
    label: 'Genre',
    type: 'suggest',
    options: classification.genres, 
    show: true,
    sample: 'Science Fiction',
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'rating',
    show: true,
    sample: 5,
  },
  {
    id: 'comments',
    label: 'Comments',
    type: 'text',
    sample: 'Magnificent Time Travel movie! ',
  },
]