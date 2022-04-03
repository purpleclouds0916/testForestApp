const path = require("path");
const express = require("express");
const app = express();

//ミドルウエアでstaticパスを追加（ただ、これだけだと直アクセスや無いpathだと動かない）
app.use(express.static(path.join(__dirname, "..", "build")));

//これを追加（全てをindex.htmlにリダイレクト。いわゆるrewrite設定）
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post('/booklog', (req, res) => {
    const booklog = req.body
    res.json({
        "ok": true,
        "booklog": booklog
    })
})

app.listen(3006, () => {
    console.log("server started on port 3006");
});