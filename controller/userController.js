const User = require("../model/User");
const jwt = require("jsonwebtoken")

const sendMail = require("../middlewares/sendMail")
const cloudinary = require("cloudinary");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        // const user = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(400).json({
                success: false,
                meessage: "Invalid email or password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged in successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const logout = async (req, res) => {
    try {

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged out successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const getUser = async (req, res) => {
    try {
        //login sarao website visit kora jabe 
        const user = await User.findOne().select("-password -email");
        // const user = await User.findOne({ email }).select('+password');

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const myProfile = async (req, res) => {
    try {
        // req.uaer._id eta ase auth.js file er isAuthenticated er req.user=user theje
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Send a userMessage
        const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;
        await sendMail(userMessage);
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const updateUser = async (req, res) => {
    try {
        //login sarao website visit kora jabe 
        // const user = await User.findOne(req.user._id);
        const user = await User.findById(req.user._id);

        // only will takes User.js obejects
        const { name, email, password, skills, about } = req.body;

        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        if (password) {
            user.password = password
        }
        if (skills) {


            if (skills.image1) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);

                // image upload krbe
                const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
                    folder: "portfolio"
                });

                //image save krbe
                user.skills.image1 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            if (skills.image2) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);

                const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
                    folder: "portfolio"
                });
                user.skills.image2 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            if (skills.image3) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
                    folder: "portfolio"
                });
                user.skills.image3 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            if (skills.image4) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
                    folder: "portfolio"
                });
                user.skills.image4 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            if (skills.image5) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image5.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
                    folder: "portfolio"
                });
                user.skills.image5 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            if (skills.image6) {

                // user e 1st e image save silo seta delete kre dilam 
                await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
                    folder: "portfolio"
                });
                user.skills.image6 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }

        if (about) {
            if (about.name) {
            user.about.name = about.name;
            }
            if (about.title) {
            user.about.title = about.title;
            }
            if (about.subtitle) {
            user.about.subtitle = about.subtitle;
            }

            if (about.description) {
            user.about.description = about.description;
            }
            if (about.quote) {
            user.about.quote = about.quote;
            }

            if (about.avatar) {
                await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

                const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
                    folder: "portfolio",
                });

                user.about.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.meessage
            // message: "Something was wrong"
        });
    }
};

const addTimeline = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // req.uaer._id eta ase auth.js file er isAuthenticated er req.user=user theje
        const user = await User.findById(req.user._id);

        // last e add krle seta 1st e show hbe website e
        user.timeline.unshift({
            title,
            description,
            date
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Added to timeline"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const addProject = async (req, res) => {
    try {
        const { url, title, image, description, techStack } = req.body;

        const user = await User.findById(req.user._id);

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        });
        user.projects.unshift({
            url,
            title,
            description,
            techStack,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Added to projects"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const addYoutube = async (req, res) => {
    try {
        const { url, title, image } = req.body;

        const user = await User.findById(req.user._id);

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        });
        user.youtube.unshift({
            url,
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });
        await user.save();

        res.status(200).json({
            success: true,
            message: "Added to youtube"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const deleteTimeline = async (req, res) => {
    try {
        const { id } = req.params;

        // req.uaer._id eta ase auth.js file er isAuthenticated er req.user=user theje
        const user = await User.findById(req.user._id);

        // ekhane user.timeline ekta new array. krn User.js e timeline array te ase, so item._id !== id hole ekta new array create hbe
        user.timeline = user.timeline.filter((item) => { item._id != id });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Deleted from timeline"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const deleteYoutube = async (req, res) => {
    try {
        const { id } = req.params;

        // req.uaer._id eta ase auth.js file er isAuthenticated er req.user=user theje
        const user = await User.findById(req.user._id);

        // ekhane video._id === id match hbe
        // const video = user.youtube.filter((video) => { video._id === id });
        const video = user.youtube.find((video) => { video._id == id });

        console.log(video);

        // video item delete hobe
        await cloudinary.v2.uploader.destroy(video.image.public_id)

        // ekhane user.timeline ekta new array. krn User.js e timeline array te ase, so item._id !== id hole ekta new array create hbe
        // user.youtube = user.youtube.filter((video) => { video._id !== id });
        user.youtube = user.youtube.filter((video) => { video._id != id });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Deleted from youtube"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // req.uaer._id eta ase auth.js file er isAuthenticated er req.user=user theje
        const user = await User.findById(req.user._id);

        // ekhane video._id === id match hbe
        const project = user.projects.find((item) => { item._id == id });

        // video item delete hobe
        await cloudinary.v2.uploader.destroy(project.image.public_id)

        // ekhane user.timeline ekta new array. krn User.js e timeline array te ase, so item._id !== id hole ekta new array create hbe
        user.projects = user.projects.filter((item) => { item._id != id });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Deleted from project"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

module.exports = deleteProject;

module.exports = deleteYoutube;

module.exports = deleteTimeline;

module.exports = addYoutube;

module.exports = addProject;

module.exports = addTimeline;

module.exports = updateUser;

module.exports = contact;

module.exports = myProfile;

module.exports = getUser;

module.exports = logout;

module.exports = login;