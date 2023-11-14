const crypto = require('crypto');
const paymentModel = require("../models/payment_model");

async function getOption(code, id, username) {
    let partnerCode = process.env.momo_partner_code;
    let partnerClientId = code;
    let accessKey = process.env.momo_access_key;
    let secretkey = process.env.momo_secret_key;
    let requestId = partnerCode + new Date().getTime();
    let orderId = requestId;
    let orderInfo = "Buy Ngọc Phúc Some Coffee";
    let redirectUrl = "http://localhost:3000/api/momo/callback";
    let ipnUrl = "http://localhost:3000/api/momo/callback";
    let amount = "60000";
    let requestType = "captureWallet"
    let extraData = "";
    let rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerClientId=" + partnerClientId + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    let signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        partnerClientId: partnerClientId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'vi'
    });
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    let userId= id;
    let userName = username;
    console.log("thanh toán thành công :ED");
    // await paymentModel.create({user:{userId, userName}});

    return {options,requestBody};
}
module.exports = {getOption};