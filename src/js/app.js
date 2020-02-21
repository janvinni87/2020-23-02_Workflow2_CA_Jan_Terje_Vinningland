if (process.env.NODE_ENV === 'development') {
  require('../index.html')
  require('../about.html')
  require('../tours.html')
  require('../contact.html')
}

require('./main.js');
