const AWS = require('aws-sdk')
const ResponseMsg = require("../ResponseMsg/ResponseMsg")
const https = require('https')
const sftpSerevr = require('ssh2-sftp-client')

const sftp = new sftpSerevr()

const configsftp = {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
}
const SftpConnection = sftp.connect(configsftp)

//Image Uplaod Usimg Sftp
exports.UploadImage = async function (file, path, imagename) {
    try {
        var Extension = file.name.split(".")
        var Filename = imagename + "_" + Date.now() + "." + Extension[Extension.length - 1]
        var destinationPath = process.env.FTP_PATH + process.env.DO_SFTP_FOLDER + path + "/" + Filename
        if (SftpConnection) {
            const pathData = await sftp.put(file.data, destinationPath)
            const Uploadpath = process.env.DO_SFTP_BASE_URL + process.env.DO_SFTP_FOLDER + path + "/" + Filename
            return Uploadpath;
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        console.log(error)
        return await CatchErrors(Not_Found, error.message)
    }
}
exports.DeleteImage = async function (imagelink, path) {
    try {
        const Filename = imagelink && imagelink?.split("/")
        const destinationPath = process.env.FTP_PATH + process.env.DO_SFTP_FOLDER + path + "/" + Filename[Filename.length - 1]
        if (SftpConnection) {
            const pathData = await sftp.delete(destinationPath)
            return { status: true, msg: "Image Delete Successfully.." }
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        console.log(error)
        // return await CatchErrors(Not_Found, error.message)
    }
}

//SFTP end
exports.ImageUpload = async (folder, file, foldername = "") => {
    try {
        const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
        const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.DO_SPACES_KEY,
            secretAccessKey: process.env.DO_SPACES_SECRET,
        });

        var Extension = file.name.split(".")
        var Filename = folder + "_" + Date.now() + "." + Extension[Extension.length - 1]
        if (foldername == "") {
            var destination = `${process.env.DO_SPACE_FOLDER_DIGITAL}/${Filename}`
        }
        else {
            var destination = `${process.env.DO_SPACE_FOLDER_DIGITAL}${foldername}/${Filename}`
        }

        const digiCridential = {
            Bucket: process.env.DO_SPACES_BUCKET,
            folder: process.env.DO_SPACE_FOLDER_DIGITAL,
            Key: destination,
            Body: file.data,
            ACL: "public-read",
            region: process.env.DO_SPACES_REGION
        }

        const dataLoc = await s3.upload(digiCridential).promise()
        return (dataLoc.Location).replace("sgp1.digitaloceanspaces.com/dairylock", "https://dairylock.sgp1.digitaloceanspaces.com")

    } catch (error) {
        return await ResponseMsg.CatchErrors(404, error.message)
    }
}
exports.ImageDelete = async (folder = "", link) => {
    try {
        const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
        const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.DO_SPACES_KEY,
            secretAccessKey: process.env.DO_SPACES_SECRET,
        });

        if (folder == "") {
            var Filename = link.split("/")
            var destination = `${process.env.DO_SPACE_FOLDER_DIGITAL}/${Filename[Filename.length - 1]}`
        }
        else {
            var Filename = link.split("/")
            var destination = `${process.env.DO_SPACE_FOLDER_DIGITAL}${folder}/${Filename[Filename.length - 1]}`
        }

        const digiCridential = {
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: destination,
        }

        const dataLoc = await s3.deleteObject(digiCridential).promise()
        if (dataLoc) {
            return { status: true }
        }
    } catch (error) {
        return await ResponseMsg.CatchErrors(404, error.message)
    }
}

exports.notificationFunc = async (api, errMsg) => {
    const passData = {
        errorMessage: errMsg,
        type: {
            android: 'https://play.google.com/store/apps/details?id=com.voice.gps.navigation.map.location.route'
        }
    }
    var message = {
        app_id: process.env.APP_ID,
        name: 'API is down',
        headings: { "en": `Voice GPS Driving Directions Test` },
        contents: { "en": `${api}` },
        included_segments: ["All"],
        small_icon: "https://play-lh.googleusercontent.com/idLfyIXHnQq0b5wyt8rkoWclTvYPvjSSUVgi9CFPNya5Nwq7zFAQLNjRtBx7qQykkJk=s48-rw",
        large_icon: "https://play-lh.googleusercontent.com/idLfyIXHnQq0b5wyt8rkoWclTvYPvjSSUVgi9CFPNya5Nwq7zFAQLNjRtBx7qQykkJk=s48-rw",
        big_picture: '',
        url: '',
        data: passData
    };
    console.log(message);

    const notify = await sendNotification(message)
}

const sendNotification = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${process.env.APP_KEY}`
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };


    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
    return (data)
};