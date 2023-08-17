const router = require("express").Router();
const { User, Income } = require('../../models');
const { useAuth } = require('../../utils/auth');

router.get('/', useAuth, async (req, res) => {
    try {

        const incomeData = await Income.findAll({
            attributes: [
                'id',
                'income_name',
                'user_income_id',
                'amount',
                'description',
                'category',
                'date'
            ],
            where: {
                user_income_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ]
                }
            ],
        });

        if (!incomeData) {
            res.status(404).json({ message: 'No income found with this user id'});
            return;
        }
        res.json(incomeData);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/:user', useAuth, async (req, res) => {
    try {
        const findIncome = await Income.findAll({
            where: {
                user_income_id: req.params.user,
            } 
        });

        if (!findIncome) {
            res.status(404).json({ message: 'No income found with this user id'});
            return;
        }
       
        const incomeUserData = findIncome.map(income => income.get({plain : true}));
        const mapIncome =new Map ()
        for (const eachIncome of incomeUserData) {
            if (mapIncome.has(eachIncome.category)) {
                mapIncome.set(eachIncome.category,mapIncome.get(eachIncome.category)+eachIncome.amount)
            } else {
                mapIncome.set (eachIncome.category,eachIncome.amount)

            }
        }
        const categoryArray  = []
        categories= mapIncome.keys()
        for (const category of categories){
            categoryArray.push(category)
        }
        console.log(categoryArray)

        const incomeArray  = []
        income= mapIncome.values()
        for (const amount of income){
            incomeArray.push(amount)
        }
        const total = incomeArray.reduce((a,c)=> a+c)
        incomeArrayPer = incomeArray.map ((amount) =>{aount/total})
        
        console.log(incomeArray)
    
        let responseData = {
            incomeUserData:incomeUserData,
            categoryArray:categoryArray ,
            incomeArrayPer:incomeArrayPer
        }
        res.json(responseData);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/:id', useAuth, async (req, res) => {
    try {
        const findIncome = await Income.findOne({
            attributes: [
                'id',
                'income_name',
                'user_income_id',
                'amount',
                'description',
                'category',
                'date'
            ],
            where: {
                id: req.params.id,
            },
            include: [
                {
                model: User,
                attributes: [
                    'id',
                    'username'
                ]
            }
        ],
        });
        console.log(findIncome);
        res.json(findIncome);
    } catch (err) {
        res.status(500).json(err);
    }

})


router.post('/', useAuth, async (req, res) => {
    try { console.log(req);
        const createIncome = await Income.create({
            income_name: req.body.income_name,
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            user_income_id: req.session.user_id,
        });
        console.log(createIncome);
        res.json(createIncome);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

router.put('/:id', useAuth, async (req, res) => {
    try {
        const updateIncome = await Income.update({
                income_name: req.body.income_name,
                description: req.body.description,
                amount: req.body.amount,
                category: req.body.category,
            },
            {
                where: {
                    id: req.params.id,
                },
            });
        console.log(updateIncome);
        res.json(updateIncome);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.delete('/:id', useAuth, async (req, res) => {
    try { 
        const deleteIncome = await Income.destroy({
            where: {
                id: req.params.id
            },
        });
        if (!deleteIncome) {
            res.status(400).json({ message: 'No income with that id'})
          }
          res.status(200).json(deleteIncome);
    } catch (err) {
        res.status(500).json('Error in finding income');
    }

});

module.exports = router;