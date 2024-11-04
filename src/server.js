import express from 'express';
import sql from 'sqlite3';

const sqlite3 = sql.verbose();

// Create an in memory table to use
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL)`);

const app = express();
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));

/*
* Gets the table
*/
app.get('/', function (req, res) {
    db.prepare('Select * From todo;');
    //TODO You will need to update the code below!
    console.log('GET called');
    res.render('index');

})

/*
* adds an item from the table
*/
function add(){
    app.post('/', function (req, res) {
        console.log('adding todo item');
    
        //adds item
        const element = document.getElementById("todo");
        const list = document.getElementById("list");
        const add = db.prepare('INSERT INTO todo (task) VALUES (?)');
        add.run(req.body.todo);
        add.finalize();
    
        let li = document.createElement("li");
        li.innerHTML = element.todo;
        list.appendChild(li);
    
    })
}

/*
* deletes an item from the table
*/
app.post('/delete', function (req, res) {
    console.log('deleting todo item');

    //Removes item
    const remove = db.prepare('DELETE FROM todo where id = (?)');
    remove.run(req.body.id);
    remove.finalize();

})

// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...');
})
