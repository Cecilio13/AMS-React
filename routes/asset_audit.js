const mongoose = require('mongoose');
const Asset = mongoose.model('hr_assets');
const Audit = mongoose.model('hr_audit');

module.exports = (app) => {
  app.post('/api/audit', async (req, res) => {
    const { asset_location, asset_site } = req.body;
    const assets = await Asset.find({
      asset_location,
      asset_site,
    });
    res.send(assets);
  });

  app.put('/api/audit', async (req, res) => {
    const auditData = req.body.map((asset) => {
      delete asset._id;
      return { ...asset };
    });
    const audit = await Audit.insertMany(auditData);
    res.send(audit);
  });

  app.post('/api/audit/existing', async (req, res) => {
    const audit = await Audit.find(req.body).populate('audit_asset');
    res.send(audit);
  });

  app.patch('/api/audit', async (req, res) => {
    const { _id } = req.body;
    delete req.body._id;
    const audit = await Audit.findByIdAndUpdate(
      _id,
      { ...req.body },
      { useFindAndModify: false }
    ).populate('audit_asset');
    res.send(audit);
  });

  app.post('/api/audit/finish', async (req, res) => {
    const assets = req.body;
    let result = [];
    for (x = 0; x < assets.length; x++) {
      const temp = await Audit.findByIdAndUpdate(
        assets[x]._id,
        {
          audit_status: true,
        },
        { useFindAndModify: false }
      );

      result.push(temp);
    }
    res.send(result);
  });
};
