export enum ValidationMessageEnums {
  EmailType = 'Email must be a string',
  EmailFormat = 'Email must be a valid email address',
  EmailRequired = 'Email is required',

  PasswordType = 'Password must be a string',
  PasswordRequired = 'Password is required',
  PasswordStrong = 'Password need to be stronger',
  PasswordMinLength = 'Password must have at least 6 characters',

  ConfirmTokenType = 'Confirmation token must be a string',
  ConfirmTokenRequired = 'Confirmation token is required',

  ConfirmCodeType = 'Confirmation code must be a string',
  ConfirmCodeRequired = 'Confirmation code is required',

  RefreshTokenType = 'Refresh token must be a string',
  RefreshTokenRequired = 'Refresh token is required',

  NameType = 'Name must be a string',
  NameRequired = 'Name is required',
  NameMinLength = 'Name must be at least 3 characters long',
  NameMaxLength = 'Name must be no more than 15 characters long',

  FirstNameType = 'First name must be a string',
  FirstNameRequired = 'First name is required',

  MiddleNameType = 'Middle name must be a string',

  LastNameType = 'Last name must be a string',
  LastNameRequired = 'Last name is required',

  PhoneType = 'Phone must be a string',
  PhoneRequired = 'Phone is required',
  PhoneFormat = 'Phone must be a valid phone number',

  PrimaryLanguageType = 'Primary language must be a string',
  PrimaryLanguageRequired = 'Primary language is required',

  TimezoneType = 'Time zone must be a string',
  TimezoneRequired = 'Time zone is required',

  IdDocumentRequired = 'ID Document is required',

  LicenseNumberType = 'License Number must be a string',

  FileType = 'Invalid file type',

  NumberType = 'Number must be a string',
  NumberRequired = 'Number is required',
  NumberFormat = 'Number must be a valid phone number',

  ProfilePictureRequired = 'ProfilePicture is required',

  CurrentPasswordType = 'Current Password must be a string',
  CurrentPasswordRequired = 'Current Password is required',
  CurrentPasswordMinLength = 'Current Password must have at least 6 characters',

  NewPasswordType = 'New Password must be a string',
  NewPasswordRequired = 'New Password is required',
  NewPasswordMinLength = 'New Password must have at least 6 characters'
}
