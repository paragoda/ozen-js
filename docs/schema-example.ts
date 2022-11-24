const schema = {
  posts: {
    id: {
      type: 'uuid',
      pk: true
    },
    name: {
      type: 'varchar',
      size: 255,
      optional: false
    },
    stars: {
      type: 'bigint'
    }
  },
  tags: {
    id: {
      type: 'uuid',
      pk: true
    },
    name: {
      type: ''
    }
  }
}
