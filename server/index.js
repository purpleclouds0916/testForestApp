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
    setTimeout(() => {
        dispatch(addCalculationResult(testFormData));
        navigate('/submit');
      }, 6 * 1000);
    res.json({
        "ok": true,
        "booklog": booklog
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server started on port 5000");
});