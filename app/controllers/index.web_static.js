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

const createEventPage = async (req, res) => {
    res.sendFile('/public/templates/form_creatEvent.html', {
        root: __dirname
    })
};

module.exports = {
    mainPage,
    loginPage,
    venuesPage,
    createEventPage
};
    