const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://File-modifier:File-modifier@cluster0.5wg0ebf.mongodb.net/File-modifier',
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}
)

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

module.exports = mongoose