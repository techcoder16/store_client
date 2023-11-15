import { Children } from "react";
import GetApiData from "../helpers/getApiData";
import PostApiData from "../helpers/postApiData";

import { toast } from "react-hot-toast";
import getApiData from "../helpers/getApiData";

export async function ValidationMenu(values) {
  const errors = verify({}, values);

  return errors;
}

async function verify(error = {}, values) {
  values.parent = values.parent === "" ? 1 : values.parent;

  const data = await GetApiData("menu/get_id_name", values.parent);

  const Values = {
    menu_name: values.menu_name,
    level: values.level,
    parent: data.id,
    id: values.id,
  };

  await PostApiData("menu/update_menu", Values);
}

export async function ValidationDepositUpdate(values) {
  const errors = verify_deposit_update({}, values);

  return errors;
}

async function verify_deposit_update(error = {}, values) {
  const Values = {
    network: values.network,
    currency: values.currency,
    address: values.address,
  };

  await PostApiData("merchant/update_deposit", Values);
}

export async function ValidationCompanyUpdate(values) {
  const errors = verify_merchant_update({}, values);

  return errors;
}

async function verify_merchant_update(error = {}, values) {
  const Values = {
    name: values.name,
    rating: values.rating,
    orders: values.orders,
    completion: values.completion,
    type: values.type,
    Payment: values.Payment,
    Currency: values.Currency,

    available: values.available,
    limitHigh: values.limitHigh,
    limitLow: values.limitLow,
    PaymentMethod: values.PaymentMethod,
    BankAccountNumber: values.BankAccountNumber,
    BankName: values.BankName,
    phoneNumber: values.phoneNumber,
    email: values.email,
    avgtime: values.avgtime,
    Ttime: values.Ttime,
    desc: values.desc,

    id: values.id,
  };

  await PostApiData("merchant/update_merchant", Values);
}

export async function ValidationWithdrawUpdate(values) {
  const errors = verify_withdraw_update({}, values);

  return errors;
}

async function verify_withdraw_update(error = {}, values) {
  const Values = {
    network: values.network,
    currency: values.currency,
  };

  await PostApiData("merchant/update_withdraw", Values);
}

export async function ValidationCompanyCreate(values) {
  const errors = verify_merchant_create({}, values);

  return errors;
}

async function verify_merchant_create(error = {}, values) {
  const Values = {
    name: values.name,
    rating: values.rating,
    orders: values.orders,
    completion: values.completion,

    Payment: values.Payment,
    Currency: values.Currency,
    type: values.type,
    available: values.available,
    limitHigh: values.limitHigh,
    limitLow: values.limitLow,
    PaymentMethod: values.PaymentMethod,
    BankAccountNumber: values.BankAccountNumber,
    BankName: values.BankName,
    phoneNumber: values.phoneNumber,
    email: values.email,
    avgtime: values.avgtime,
    Ttime: values.Ttime,
    desc: values.desc,
  };

  await PostApiData("merchant/create_merchant", Values);
}

export async function ValidationMenuCreate(values) {
  const errors = verify_menu_create({}, values);

  return errors;
}

async function verify_menu_create(error = {}, values) {
  const data = await GetApiData("menu/get_id_name", values.parent);

  const Values = {
    menu_name: values.menu_name,
    level: values.level,
    parent: data.id === "" ? 1 : data.id,
  };

  await PostApiData("menu/create_menu", Values);
}

export async function ValidationScreenCreate(values) {
  const errors = verify_screen_create({}, values);

  return errors;
}

async function verify_screen_create(error = {}, values) {
  const data = await GetApiData("menu/get_id_name", values.menu_name);

  const Values = {
    screen_name: values.screen_name,
    screen_url: values.screen_url,
    menu_name: data._id,
  };

  await PostApiData("screen/create_screen", Values);
}

export async function ValidationScreen(values) {
  const errors = verify_screen_update({}, values);

  return errors;
}

async function verify_screen_update(error = {}, values) {
  const data = await GetApiData("menu/get_id_name", values.menu_name);

  const Values = {
    screen_name: values.screen_name,
    screen_url: values.screen_url,
    menu_name: data._id,
    ID: values.id,
  };

  await PostApiData("screen/update_screen", Values);

  return error;
}

export async function ValidationUserCreate(values) {
  const errors = verify_user_create({}, values);

  return errors;
}

async function verify_user_create(error = {}, values) {
  const Values = {
    username: values.username,
    password: values.password,
    role: values.role,
  };

  await PostApiData("auth/create_user", Values);
}

export async function ValidateUser(values) {
  const errors = verify_user_update({}, values);

  return errors;
}

async function verify_user_update(error = {}, values) {
  const Values = {
    username: values.username,
    role: values.role,
    ID: values.id,
    balance: values.balance,
  };

  await PostApiData("auth/update_user", Values);
}

export async function ValidationAuthUserCreate(values) {
  const errors = verify_auth_screen({}, values);

  return errors;
}

async function verify_auth_screen(error = {}, values) {
  const data = await GetApiData(
    "screen/get_screen_id_by_name",
    values.screen_name
  );
  const userData = await GetApiData("auth/get_id_name", values.username);

  const Values = {
    username: userData._id,
    screen_name: data._id,
  };

  await PostApiData("auth/create_auth_screens", Values);
}

export async function ValiadateUserUpdate(values) {
  const errors = verify_user_update_settings({}, values);

  return errors;
}

async function verify_user_update_settings(error = {}, values) {
  const data = localStorage.getItem("user_data");
  const newData = JSON.parse(data);

  const Values = {
    username: newData.username,
    password: values.password,

    company: values.company,

    email: values.email,
    name: values.name,
    website: values.website,
  };

  await PostApiData("auth/update_user_settings", Values);
}

export async function CreateCustomerGroupValidator(values) {
  const errors = verify_create_group__settings({}, values);

  return errors;
}

async function verify_create_group__settings(error = {}, values) {
  const Values = {
    name: values.name,
  };

  await PostApiData("customer/add_customer", Values);
}

export async function SignUpValidator(values) {
  const errors = verify_signupUser({}, values);

  return errors;
}

async function verify_signupUser(error = {}, values) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passwordRegex.test(values.password)) {
    const Values = {
      username: values.username,
      password: values.password,
      email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };

    await PostApiData("auth/create_user", Values);
  } else {
    error.name = toast.error("Password is not valid");
  }

  return error;
}

export async function ValidateSignUpPlatforms(values) {
  const errors = verify_signupUserPlatform({}, values);

  return errors;
}
async function verify_signupUserPlatform(error = {}, values) {
  const Values = {
    type: values.type,
  };

  if (values.type == "google") {
    const response = await getApiData("auth/callback", "");
  } else {
    await PostApiData("auth/create_user", Values);
  }
}

export async function ValidateContactCreate(values) {
  const errors = verify_ContactPlatform({}, values);

  return errors;
}
async function verify_ContactPlatform(error = {}, values) {
  const Values = {
    date: values.date,
    name: values.name,
    industry1: values.industry1,
    industry2: values.industry2,
    
    
    empcount: values.empcount,
    phoneNumber: values.phoneNumber,
    website: values.website,
    
    companyLinkedin: values.companyLinkedin,


    city: values.city,
    region: values.region,
    country: values.country,

    firstName: values.firstName,
    lastName: values.lastName,

    jobRole: values.jobRole,
    email: values.email,


    quality:values.quality,
    result:values.quality,
    free:values.free,
    role:values.role,
    

    phoneNumber2:values.phoneNumber2,
    linkedin:values.linkedin,
    remarks:values.remarks,

    recordMarksheet:values.recordMarksheet,


  };


  await PostApiData("contact/create_contact", Values);
}

export async function ValidateContactUpdate(values) {
  const errors = verify_ContactPlatformEdit({}, values);

  return errors;
}

async function verify_ContactPlatformEdit(error = {}, values) {
  const Values = {
    date: values.date,
    name: values.name,
    industry1: values.industry1,
    industry2: values.industry2,
    
    
    empcount: values.empcount,
    phoneNumber: values.phoneNumber,
    website: values.website,
    
    companyLinkedin: values.companyLinkedin,


    city: values.city,
    region: values.region,
    country: values.country,

    firstName: values.firstName,
    lastName: values.lastName,

    jobRole: values.jobRole,
    email: values.email,


    quality:values.quality,
    result:values.quality,
    free:values.free,
    role:values.role,
    

    phoneNumber2:values.phoneNumber2,
    linkedin:values.linkedin,
    remarks:values.remarks,

    recordMarksheet:values.recordMarksheet,
    
    id: values.id,









    
    
  };


  await PostApiData("contact/update_contact", Values);
  values.navigate("/contact_list");
  
}

export async function ValidateCompanyCreate(values) {
  const errors = verify_CompanyCreate({}, values);

  return errors;
}

async function verify_CompanyCreate(error = {}, values) {
  let date = new Date().toJSON();

  const Values = {
    companyName: values.companyName,
    website: values.website,
    industry: values.industry,
    industry2: values.industry2,
    companyLinkedIn: values.companyLinkedIn,
    Region: values.Region,
    Country: values.Country,
    name: values.name,
    date: date,
  };

  await PostApiData("company/create_company", Values);

  values.navigate("/contact");
}

export async function ValidateCompanyUpdate(values) {
  const errors = verify_CompanyUpdate({}, values);

  return errors;
}



async function verify_CompanyUpdate(error = {}, values) {


  const Values = {
    companyName: values.companyName,
    website: values.website,
    industry: values.industry,
    industry2: values.industry2,
    companyLinkedIn: values.companyLinkedIn,
    Region: values.Region,
    Country: values.Country,
    name: values.name,
    id:values.id,
    
  };


  await PostApiData("company/update_company", Values);

  values.navigate("/dashboard");
}


