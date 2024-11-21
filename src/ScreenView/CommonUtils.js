import React from 'react';
import {Platform} from 'react-native';

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4();
}

function getCreatedDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString().slice(-2);
  const createdDate = `${year}${month}${day}`;
  return Platform.OS === 'ios' ? 'I' + createdDate : 'A' + createdDate;
}

//db table names
export const TABLE_CLIENT_CARS = 'userManualCars';

export const COUNTRY_CODE = '+966';
export const PHONE_NUMBER_LIMIT = 9;

//PaymentGateways Environments
const isDev = false;
const tabbyDev = true;
//alrajhibank
export const alrajhi_create_session = isDev
  ? 'https://securepayments.alrajhibank.com.sa/pg/payment/hosted.htm'
  : 'https://digitalpayments.alrajhibank.com.sa/pg/payment/hosted.htm';
export const alrajhi_payment_page = isDev
  ? 'https://securepayments.alrajhibank.com.sa/pg/paymentpage.htm'
  : 'https://digitalpayments.alrajhibank.com.sa/pg/paymentpage.htm';
export const alrahhi_transportal_id = isDev
  ? '1qQJ5xEhmG6Sq48'
  : '8WeK312zJfJTl7b';
export const alrahhi_transportal_pwd = isDev
  ? '4!tK$xb1$IB3Y7x'
  : '#4dJ!n18X1Jfw!B';
export const alrahhi_terminal_resource_key = isDev
  ? '31565271106231565271106231565271'
  : '31576931357631576931357631576931';

export const tabby_authToken = tabbyDev
  ? 'sk_test_dda111cc-e1eb-4444-a7a6-47e2fde2ed38'
  : 'sk_e7928b48-8e7e-496a-93fa-f120d58d327d';
export const tabby_checkout = tabbyDev
  ? 'https://app-xaop4bxqda-uc.a.run.app/tabbyPaymentId'
  : 'https://app-xaop4bxqda-uc.a.run.app/tabbyPaymentId';
export const tabby_payment_details = tabbyDev
  ? 'https://app-xaop4bxqda-uc.a.run.app/getTabbyPaymentDetails'
  : 'https://app-xaop4bxqda-uc.a.run.app/getTabbyPaymentDetails';
export const tabby_payment_capture = tabbyDev
  ? 'https://app-xaop4bxqda-uc.a.run.app/tabbyPaymentCapture'
  : 'https://app-xaop4bxqda-uc.a.run.app/tabbyPaymentCapture';

export {guidGenerator, getCreatedDate};
