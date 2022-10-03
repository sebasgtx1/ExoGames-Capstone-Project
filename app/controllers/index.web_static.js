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

const venuesPage = async (req, res) => {
    res.sendFile('/public/templates/venues.html', {
        root: __dirname
    })
};

const competitorsPage = async (req, res) => {
    res.sendFile('/public/templates/competitors.html', {
        root: __dirname
    })
};

const usersPage = async (req, res) => {
    res.sendFile('/public/templates/users.html', {
        root: __dirname
    })
};

module.exports = {
    mainPage,
    loginPage,
    venuesPage,
    competitorsPage,
    usersPage
};
    