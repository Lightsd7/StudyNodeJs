class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all("SELECT * FROM livros", (erro, resultados) => {
                if (erro) return reject("Não foi possível listar os livros!");

                return resolve(resultados);
            });
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                INSERT INTO livros (
                    titulo,
                    preco, 
                    descricao
                ) values (?,?,?)
            `,
                [livro.titulo, livro.preco, livro.descricao],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject("Não foi possível adicionar o livro!");
                    }
                    resolve();
                }
            );
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * livros WHERE id = ?`, [id], (err, livro) => {
                if (err) {
                    console.log(err);
                    return reject("Não foi possível encontrar o livro!");
                }
                resolve(livro);
            });
        });
    }
}

module.exports = LivroDao;
