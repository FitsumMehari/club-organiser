const cloudinary = require("./cloudinary")

exports.setSavedFile = async function setSavedFile(tempfileName, tempfileURL) {

    let tempsavedFile = {}
    let cloudfileUrl = ""

    // Saving file to cloudinary
    const uploader = async(path) => await cloudinary.uploads(path, "ClubOrganizerFiles")

    await uploader(tempfileURL).then((result) => {
        cloudfileUrl = result.url
    })
    tempsavedFile.fileName = tempfileName;
    tempsavedFile.fileURL = cloudfileUrl;
    return tempsavedFile
}