const mainPage = async (req, res) => {
    res.sendFile('/public/templates/index.html', {
        root: __dirname
    })
};

module.exports = {
    mainPage
};
    