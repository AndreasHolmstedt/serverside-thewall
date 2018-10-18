/*

CREATES 1000 USER DOCUMENTS
all data is randomly generated.

data structure example
    user: {
        _id: xx
        first_name: "per",
        last_name: "fredriksson",
        email: "per.fredriksson@gmail.com",
        url: "www.nicepic.com/asaosaks"
    }

*/



const Client = require("mongodb").MongoClient
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://127.0.0.1:27017"

let all_inserted_users = []

console.log('Connecting to MongoDB at', url)
Client.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log(err)
        return true
    }
    const db = client.db("theWall")
    const collection = db.collection("users")
    let n = 100
    let data = populateUserList(n)

    console.log(`Connection asserted. Inserting ${n} user documents`)
    collection.insertMany(data, err => {
        if(err) {
            console.log(err)
            client.close()
            return true
        }
        // create a list containing all newly created users ids.
        for (i in data){
          all_inserted_users.push(data[i]._id)
        }

        // loop over all newly created users to create random friends and statuses data.
        for (i in data){
          // shuffle the list with all users ids.
          let shuffled = all_inserted_users.sort(() => .5 - Math.random());
          // decide who many friends this user will have.
          let nr_of_friends = Math.floor(Math.random() * 10) + 5
          // get that amount of random friends from that shuffled list.
          let selected = shuffled.slice(0,nr_of_friends) ;

          //update the specific user object.
          collection.updateOne({_id: ObjectID(data[i]._id)}, {
            $set: {friends: selected,}
          }, { upsert: true })
        }

        console.log('Data inserted. Closing client...')
        client.close()
    })
})


/*------------------------------------------------------------------------------
------------------------------------------------------------------------------*/

function generateUser(){
    const n1 = ['alice', 'emma', 'erik', 'eric', 'peter', 'stina', 'umar', 'andreas', 'dennis', 'lina', 'fredrik', 'oskar', 'oscar', 'lisa', 'karolin', 'linn', 'liselotte', 'jacob', 'jakob', 'greta', 'david', 'per', 'petra', 'marie', 'ramtin', 'josefine', 'sanna', 'kristoffer', 'markus', 'sebastian', 'rikard', 'viktor', 'henrietta', 'evelina', 'anna', 'robert', 'jens', 'alexander', 'mimmi', 'christer', 'christian', 'tobias', 'maja', 'lars', 'klas', 'jonathan', 'jim', 'james', 'åke', 'joel', 'jolin', 'jolina', 'michael', 'malin', 'isabelle', 'calle', 'mahnor', 'samantha', 'kenneth', 'damon', 'jesper', 'rasmus', 'ola', 'filippa', 'dimas', 'emilia', 'henrik', 'lena', 'michaela', 'amelia', 'andré', 'joakim', 'joachim', 'matilda', 'kevin', 'kristian', 'annika', 'frida', 'hannes', 'sofie', 'lovisa', 'linda', 'martin', 'levi', 'vendela', 'anton', 'sara', 'sofia', 'oliver', 'oliva', 'ann', 'nellie'];
    const n2 = ['andersson', 'svensson', 'persson', 'mascik', 'holmstedt', 'langelotz', 'grönvall', 'qvarfordt', "thulin", 'öhman', 'rydenfalk', 'floberg', 'claesson', 'dahlbäck', 'carlsson', 'rosberg', 'tikka', 'jensen', 'lundberg', 'lindström', 'parvaneh', 'björklund', 'gunnervald', 'plumpuu', 'anderssen', 'frick', 'hjers', 'henningsson', 'flores', 'guneriusson', 'digerud', 'johansson', 'jansson', 'smith', 'ljungblad', 'moreau', 'gauffin', 'sandberg', 'gustavsson', 'klingesten', 'joelsson', 'raja', 'abrahamsson', 'ruthner', 'ekström', 'wikander', 'harvonen', 'roos', 'ödvall', 'trkulja', 'larsson', 'sveningsson', 'söderman', 'bellini', 'björk', 'edman', 'kleban', 'lager', 'hjalmarsson', 'vendelstrand', 'lybeck', 'beck', 'bäck', 'hällgren', 'hansson', 'wendin', 'jepsson', 'dotes', 'ahlberg', 'nalen', 'ekeroth', 'bersten', 'berggren', 'bengelsdorff', 'bellis', 'fagerlund', 'lund', 'nelson'];
    const mail_domain = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@live.se', '@live.com', '@yahoo.se', '@outlook.com', '@inbox.com', '@hushmail.com'];

    let r1 = Math.floor(Math.random() * n1.length);
    let first_name = `${n1[r1]}`;


    let r2 = Math.floor(Math.random() * n2.length);
    let last_name = `${n2[r2]}`;

    let r3 = Math.floor(Math.random() * mail_domain.length);
    let email = `${first_name}.${last_name}${mail_domain[r3]}`.replace("-", "_")

    let profile_pics = ['https://i.imgur.com/p7FmrgH.jpg', 'https://i.imgur.com/wC5ETq0.jpg', 'https://i.imgur.com/LBy4WcJ.jpg', 'https://i.imgur.com/E3VsnEe.jpg',
    'http://www.fubiz.net/wp-content/uploads/2018/05/adobestocknb7.jpg',
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.unsplash.com/photo-1514626585111-9aa86183ac98?ixlib=rb-0.3.5&s=6429b9b6cefb44d85d71efdfe9c5bd96&w=1000&q=80',
    'http://images.unsplash.com/photo-1531650501148-996193a674e3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=d7818a2885323956569ca48461506b00',
    'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&h=350',
    'http://79hbm1979mg58bnh1fp50y1bry.wpengine.netdna-cdn.com/wp-content/uploads/2018/02/Elliott-786x1024.jpg',
    'https://cdn.lynda.com/course/480112/480112-636123827047994433-16x9.jpg',
    'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://c1.staticflickr.com/8/7579/15671305855_0cbe715034_b.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Official_portrait_of_Andy_McDonald_crop_2.jpg/1200px-Official_portrait_of_Andy_McDonald_crop_2.jpg',
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSAjdnJjshx2FPDP9zABg0NZoOzmRnUae0P_rusHyO0hxVPCQ_w",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFBpWU_UxdQn2CfJN9HyvQB_10YEFBCMoopVcjObGt2yv5gW0http://beauty411.net/wp-content/uploads/2013/10/BB-Smokey-Eye-Collection-model-400x349.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGJ3K2RXdlwLoumBPOFD2yKbAuByhl_T5_uf6VI92MaHupq_4",
    "https://galeri12.uludagsozluk.com/513/kumral-erkek_906340.jpg",
    "http://res.freestockphotos.biz/pictures/13/13376-vintage-portrait-of-professor-flammarion-pv.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZQr8q0wj-5tc0wAidVdggC9UEejiJT3IoZlqTpbevGHhBoWE",
    "https://cdn.akhbaralaan.net/db6/7d9/aa7/db67d9aa7d8e27c21b289699bc4921c759e16109/1/original.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9qI_Y2P_GlC_iLr6OeqL4SKze7PkUsAr4zhVvWIrk2Ximmh3ZQ",
    "https://ichef.bbci.co.uk/news/660/cpsprodpb/E86F/production/_101130595_hi046470518.jpg",
    "https://images.unsplash.com/photo-1503593245033-a040be3f3c82?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6377c4ad91dd5c06bd7e68121329ceaa&w=1000&q=80",
    "https://www.fredporez.com/wp-content/uploads/portfolio/2017/cap-man-portrait.jpg",
    "https://cdn9.picryl.com/photo/2014/12/31/official-portrait-and-passport-sitting-for-mercedes-marquez-assistant-secretary-b3740a.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWv66C3__5tbng9MOsIDhMRI-UdPycD_DKQk0IIsQDJZGTwxK",
    "http://imoe.files.wordpress.com/2008/10/nenek-qurban.gif",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUc5lrdRA-VU28JZzjZJYljCe6g8ovJOP52IDMdqP3IcjvGqu",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZMaaCVNcYHxo1Z-clymLl_y6u6-1w7bONCodrOCgTfBlODMshw",
    "https://images.pexels.com/photos/34667/person-human-male-man.jpg?cs=srgb&dl=adult-anger-angry-34667.jpg&fm=jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/19/53/man-815258_960_720.jpg",
    "http://marcelwiessler.de/wp-content/uploads/2014/08/dipl-ing-karl-schikora-face-panorama.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e9/Steve-whitaker-portrait-blue.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yrpu7Yk7KFbqzbHquw3SNlu5FGG6cANzQpwqmt6upjXP1udh",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Official_Portrait_of_President_Reagan_1981-cropped.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/31/Einar-Norelius-artist-portrait-391907421864.jpg",
    "https://c1.staticflickr.com/5/4130/5025666458_52991227de_b.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Cmlj_LYfRKL60z9wz4ecBA9o9y809p1XGNc8TUHxGY5N_mbz",
    "https://farm1.staticflickr.com/475/18784149924_a2132a1c25_b.jpg",
    "https://www.scandinaviandesign.com/wp-content/uploads/KasperSalto-HR.jpg",
    "http://www.dgeec.gov.py/assets/images/team/team-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQih58BbKIt5BFEXJBl3IG8QtPCnZffZlRy-HWQmzIcnvo0pwaI",
    "https://www.publicdomainpictures.net/pictures/210000/nahled/bald-eagle-portrait-149088694490i.jpg",
    "https://c1.staticflickr.com/2/1532/24446260174_e3cabbf417_b.jpg",
    "https://weelovejessica.weebly.com/uploads/4/6/6/0/46608129/6541087_orig.jpg",
    "https://www.publicdomainpictures.net/pictures/30000/nahled/portrait-of-a-man-1331296473U9x.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/aa/Portrait-as-an-artist-as-a-young-man.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0u-LcY09iQVip2bk5VmBIXMS5qx1jbBnaePK-zuB764Fseiu",
    "https://i.pinimg.com/736x/00/d6/43/00d6436d2d9283f7ce61f87b07ae378e--portrait-men-male-portrait-photography.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHRvgecgplHnbXaleWLbARU2wFX5EgIZBCkX3_Lrs1lPQ0iE36Kw",



]
    let r4 = Math.floor(Math.random() * profile_pics.length);
    let url = `${profile_pics[r4]}`

    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

    return {
        first_name: first_name,
        last_name: last_name,
        email: email,
        url: url
    }

};

function populateUserList(n) {
    let list = [];

    for(let i = 0; i < n; i++) {
        list.push(generateUser());
    }

    return list;
}
