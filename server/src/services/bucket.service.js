const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const accessKey = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY
const bucketName = process.env.AWS_S3_BUCKET_NAME
const bucketRegion = process.env.AWS_S3_BUCKET_REGION

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const attachThumbnailURLToCourses = async (courses) => {
    // code refractor needed
    for (let i = 0; i < courses.length; i++) {
        if (!courses[i].thumbnail) {
            console.log('Thumbnail key was not found in The Arg provided - ',courses[i])
            return false 
        }
        courses[i] = courses[i].toObject()
        courses[i].thumbnailURL = await getThumbnailURL(courses[i].thumbnail)
    }

    return courses
}

const uploadThumbnailToBucket = async (course, thumbnail) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const courseTitleWithoutSpaces = course.title.trim().replace(/ /g, '-');
    const extension = thumbnail.mimetype.split('/')[1]
    const fileName = `thumbnail/${courseTitleWithoutSpaces}-${uniqueSuffix}.${extension}`

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: thumbnail.buffer,
        ContentType: thumbnail.mimetype,
        Metadata: {
            course: course.title.toString(),
            originalName: thumbnail?.originalname.toString(),
            originalSize: thumbnail?.size.toString(),
            time: (new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toString()
        }
    }

    const command = new PutObjectCommand(params)

    s3.send(command)
        .then(response => console.log('Thumbnail uploaded to S3 bucket successfully.'))
        .catch(error => {
            console.log('error while uploading thumbnail to s3' + error)
            return false
        })

    return fileName
}

const uploadLesson = async (lesson) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const lessonTitleWithoutSpaces = lesson.data.title.trim().replace(/ /g, '-');
    const extension = lesson.file.mimetype.split('/')[1]
    const fileName = `lesson/${lessonTitleWithoutSpaces}-${uniqueSuffix}.${extension}`

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: lesson.file.buffer,
        ContentType: lesson.file.mimetype,
        Metadata: {
            course: lesson.data.title.toString(),
            tutor: lesson.tutor.name,
            originalName: lesson.file.originalname.toString(),
            originalSize: lesson.file.size.toString(),
            time: (new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toString()
        }
    }

    console.log(params)

    const command = new PutObjectCommand(params)

    await s3.send(command).catch(error => {
        console.log('error while uploading thumbnail to s3' + error)
        return false
    })

    return fileName
}

const getThumbnailURL = async (imageName) => {
    // fake thumbnail
    if (process.env.FAKE_BUCKET) {
        console.count('Faked thumbnail url')
        return 'https://i.ytimg.com/vi/pN6jk0uUrD8/mqdefault.jpg'
    }

    console.count('GET Request send to S3')
    const imageUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: bucketName,
            Key: imageName
        }),
        { expiresIn: 60 * 10 } // 10 Minutes 
    )
    return imageUrl

}

const getVideoURL = async (videoName) => {
    //fake video
    if (process.env.FAKE_BUCKET) {
        console.count('Faked video url')
        return 'http://clips.vorwaerts-gmbh.de/VfE.ogv'
    }

    console.count('GET Request send to S3')
    const videoURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: bucketName,
            Key: videoName
        }),
        { expiresIn: 60 * 60 * 10 } // 60 seconds
    )
    return videoURL
}


module.exports = {
    uploadThumbnailToBucket,
    getThumbnailURL,
    getVideoURL,
    uploadLesson,
    attachThumbnailURLToCourses
}