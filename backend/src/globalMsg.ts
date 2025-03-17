const globalMsg = {

  common: {
    CREATED_SUCCESSFULLY: "Created",
    CLINET_CREATED: "Client created, and an email has been sent to them.",
    FETCH_DATA_SUCCESSFULLY: "Fetch data ",
    UPDATED_SUCCESSFULLY: "Updated",
    ADDRESS_UPDATED: "Address updated",
    PASSWORD_UPDATED: "Password updated",
    DELTED_SUCESSFULLY: "Deleted",
    DOCUMENT_SHIPMENT_REQUEST: "Document shipment requested",
    SHIPPING_UPDATED: "Shipping details updated",
    PAYMENT_SUCCESS: "Payment processed",
    SUCCESS: 'Success',
    FORGET_PASSWORD: "Password reset link sent on your email",
    EXPRESS_REGISTERED_SUCCESS: "Account created. Temporary password sent to client's email.",
    USER_UPDATED_SUCCESSFULLY: "User Updated",
  },

  documents: {
    DOCUMENT_UPLOADED: "Document uploaded",
    DOCUMENT_ACCEPTED: 'Document accepted',
    DOCUMENT_REJECTED: 'Document rejected',
  },


  errors: {
    OTP_EXPIRED: 'OTP expired',
    INVALID_TOKEN: "Invalid Token",
    USER_NOT_FOUND: "User not found",
    SESSION_NOT_FOUND: "Unable to fetch session data",
    PAYMENT_NOT_SUCCESSFUL: "Payment not successful",
    NO_PAYMENT_INTENT: "No Payment intent found",
    UNAUTHORIZED: "Unauthorized",
    ROLE_NOT_FOUND: "Role not found",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    PHONE_NO_ALREADY_EXISTS: "Phone number already exists",
    LAWYER_NOT_FOUND: 'Lawyer not found',
    NO_CLIENTS: 'No clients found',
    NO_CLIENT_FOUND: 'No client found',
    NO_DOCUMENTS: 'No documents found',
    NO_DOCUMENT_TYPE: 'No documents type found',
    NO_SUBSCRIPTION_TYPE: 'No subscription type found',
    NO_SUBSCRIPTION: 'No subscription found',
    CLIENT_NOT_FOUND: 'Client not found',
    CLIENT_NOT_ACTIVE: 'Client is not active',
    INVALID_IDS: 'Invalid ClientId or LawyerId',
    DOCUMENT_NOT_FOUND: 'Document not found',
    USER_NOT_BE_DELETED: 'Client cannot be deleted because it is currently active',
    PASSWORD_NOT_SET: 'Password is not set',
    DOCUMENT_SHIPMENT_NOT_FOUND: "Document shipment not found",
    DELIVERY_ADDRESS_NOT_FOUND: "Delivery address not found",
    ADDRESS_NOT_FOUND: "Address not found",
    STATUS_NOT_FOUND: "Status not found",
    DOCUMENT_TRACKING_NOT_FOUND: "Document tracking not found",
    DOCUMENT_HISTORY_NOT_FOUND: "Document history not found",
    INVALID_SUBSCRIPTION_TYPE: "Invalid subscription type",
    CLIENT_DELETED_SUCCESSFULLY: "Client deleted",
    ALREADY_SUBSCRIBED: "Already Onboarded! Please login to continue.",
    INVALID_USERNAME_PASSWORD: "Incorrect username or password",
    COGNITO_ID_NOT_FOUND: "Incomplete account details. Contact support.",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    EXISTING_SUBSCRIPTION: "Already subscribed",
    INVALID_OLD_PASSWORD: "Old password is wrong"
  },



  auth: {
    PASSWORD_RESET_SUCCESSFULLY: "Your password has been reset",
    OTP_VERIFICATION_SUCCESSFULLY: "Otp verification successful",
    PASSWORD_CHANGE_SUCCESSFULLY: "Password changed",
    FP_LINK_SENT_SUCC: "A link has been sent to your email to reset your password.",
    LOGGED_IN_SUCCESSFUL: "You're now logged in",
    LOGOUT_SUCCESS: 'You have been logged out',
    PASSWORD_UPDATED_SUCCESS: "Password udpated",
    REGISTERED_SUCCESSFULLY: "Registered",
    CURRENT_LOGGEDIN_USER: "CURRENT_LOGGEDIN_USER",
    PASSWORD_UPDATED_SUCCESSFULLY: "Password updated",
    ERROR_SENDING_EMAIL: "Error on sending email",
    COULD_NOT_ASSIGN_ROLE: "COULD_NOT_ASSIGN_ROLE",
    PASSWORD_DOES_NOT_MATCH: "Passwords does not match",
    PROFILE_UPDATE_SUCC: "Profile updated"

  },

  SUCCESS: "SUCCESS",
  UPLOAD_SUCC: "Upload success",
  BOOKING_CREATE_SUCCESS: "Booking creation success",
  CREAE_SUBSCRIPTION_PLAN_SUCCESS: "CREAE_SUBSCRIPTION_PLAN_SUCCESS",
  OTP_SENT: "Sms sent successfully your phone please verify.",
  USER_CREATE_ERROR: "USER_CREATE_ERROR",
  REMOVE_BOOKMARK: "Remove bookmark",
};

export default globalMsg;
