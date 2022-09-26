const mainPage = async (req, res) => {
    res.sendFile('/public/templates/index.html', {
        root: __dirname
    })
};

const loginPage = async (req, res) => {
    res.sendFile('/public/templates/login_form.html', {
        root: __dirname
    })
};

module.exports = {
    mainPage,
    loginPage
};
    