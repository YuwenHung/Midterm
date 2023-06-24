const Student = require('../models/student.model')

exports.create = (req, res) => {
    if (!req.body.major) {
        return res.status(400).send({
            'message': 'Major can not be empty'
        })
    }

    const student = new Student({
        name: req.body.name || 'Untitled',
        age: req.body.age,
        major: req.body.major,
        createdDate: req.body.createdDate,
        updatedDate: req.body.updatedDate
    })

    student.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                'message': 'Something went wrong!!',
                'error': err
            })
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndUpdate(id, {
        name: req.body.name,
        age: req.body.age,
        major: req.body.major,
        updatedDate: req.body.updatedDate
    }, { new: true }).then(student => {
        res.send(student)
    }).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}

exports.findAll = (req, res) => {
    Student.find().then(students => {
        res.send(students)
    }
    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}


exports.findOne = (req, res) => {

    const id = req.params.id;

    Student.findById(id).then(students => {
        if (!students) {
            res.status(400).send({
                'message': 'No Student with the provided ID!!'
            }
            )
        }
        res.send(students)
    }
    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}


exports.delete = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id).then(students => {
        res.send({
            'message': 'Student Information Removed!'
        })
    }
    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}
