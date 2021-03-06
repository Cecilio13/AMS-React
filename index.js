const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Models
require('./models/hr_asset_transaction_log');
require('./models/hr_assets');
require('./models/hr_asset_setup');
require('./models/hr_asset_request');
require('./models/users');
require('./models/hr_audit');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Database Setup
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-kgze8.mongodb.net/ams_main?retryWrites=true&w=majority',
  // 'mongodb://localhost/Accounting',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

require('./routes/asset')(app);
require('./routes/asset_setup')(app);
require('./routes/asset_dashboard')(app);
require('./routes/asset_audit')(app);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening in port ' + PORT);
});
