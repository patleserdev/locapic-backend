var express = require('express');
var router = express.Router();

const Place = require('../models/places');
const { checkBody } = require('../modules/checkBody');


router.post('/places', (req, res) => {
    if (!checkBody(req.body, ['nickname', 'name','latitude','longitude'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
    const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });

      newPlace.save()
      .then((data) => { 
        if(data)
        {
            res.json({ result: true })
        }
        else
        {
            res.json({ result: false })
        }
      })

})

router.get('/places/:nickname', (req, res) => {
    if(req.params.nickname != '')
    {
        Place.find({nickname : req.params.nickname })
        .then((data) => {
            if(data)
            {
                let formattedDatas=[]
                data.map((element) => formattedDatas.push({ nickname: element.nickname, name: element.name, latitude: element.latitude, longitude: element.longitude }))
                res.json({ result: true, places: formattedDatas })
            }
            else
            {
                res.json({ result: false })
            }
 
        })
    }
})

router.delete('/places', (req, res) => {
    if (!checkBody(req.body, ['nickname', 'name'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    Place.deleteOne({ nickname : req.body.nickname,name: req.body.name})
    .then((data)=>{
        console.log(data)
        if (data.deletedCount > 0)
        {
           res.json({ result: true }) 
        }
        else
        {
            res.json({ result: false }) 
        }
    })




})

module.exports = router;
