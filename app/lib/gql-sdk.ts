import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentStatsMentalStats = {
  __typename?: 'ComponentStatsMentalStats';
  aggression?: Maybe<Scalars['Int']['output']>;
  anticipation?: Maybe<Scalars['Int']['output']>;
  bravery?: Maybe<Scalars['Int']['output']>;
  composure?: Maybe<Scalars['Int']['output']>;
  concentration?: Maybe<Scalars['Int']['output']>;
  decisions?: Maybe<Scalars['Int']['output']>;
  determination?: Maybe<Scalars['Int']['output']>;
  flair?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  leadership?: Maybe<Scalars['Int']['output']>;
  off_the_ball?: Maybe<Scalars['Int']['output']>;
  positioning?: Maybe<Scalars['Int']['output']>;
  teamwork?: Maybe<Scalars['Int']['output']>;
  vision?: Maybe<Scalars['Int']['output']>;
  work_rate?: Maybe<Scalars['Int']['output']>;
};

export type ComponentStatsMentalStatsFiltersInput = {
  aggression?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentStatsMentalStatsFiltersInput>>>;
  anticipation?: InputMaybe<IntFilterInput>;
  bravery?: InputMaybe<IntFilterInput>;
  composure?: InputMaybe<IntFilterInput>;
  concentration?: InputMaybe<IntFilterInput>;
  decisions?: InputMaybe<IntFilterInput>;
  determination?: InputMaybe<IntFilterInput>;
  flair?: InputMaybe<IntFilterInput>;
  leadership?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentStatsMentalStatsFiltersInput>;
  off_the_ball?: InputMaybe<IntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentStatsMentalStatsFiltersInput>>>;
  positioning?: InputMaybe<IntFilterInput>;
  teamwork?: InputMaybe<IntFilterInput>;
  vision?: InputMaybe<IntFilterInput>;
  work_rate?: InputMaybe<IntFilterInput>;
};

export type ComponentStatsMentalStatsInput = {
  aggression?: InputMaybe<Scalars['Int']['input']>;
  anticipation?: InputMaybe<Scalars['Int']['input']>;
  bravery?: InputMaybe<Scalars['Int']['input']>;
  composure?: InputMaybe<Scalars['Int']['input']>;
  concentration?: InputMaybe<Scalars['Int']['input']>;
  decisions?: InputMaybe<Scalars['Int']['input']>;
  determination?: InputMaybe<Scalars['Int']['input']>;
  flair?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  leadership?: InputMaybe<Scalars['Int']['input']>;
  off_the_ball?: InputMaybe<Scalars['Int']['input']>;
  positioning?: InputMaybe<Scalars['Int']['input']>;
  teamwork?: InputMaybe<Scalars['Int']['input']>;
  vision?: InputMaybe<Scalars['Int']['input']>;
  work_rate?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentStatsPhysicalStats = {
  __typename?: 'ComponentStatsPhysicalStats';
  acceleration?: Maybe<Scalars['Int']['output']>;
  agility?: Maybe<Scalars['Int']['output']>;
  balance?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  jumping_reach?: Maybe<Scalars['Int']['output']>;
  natural_fitness?: Maybe<Scalars['Int']['output']>;
  pace?: Maybe<Scalars['Int']['output']>;
  stamina?: Maybe<Scalars['Int']['output']>;
  strength?: Maybe<Scalars['Int']['output']>;
};

export type ComponentStatsPhysicalStatsFiltersInput = {
  acceleration?: InputMaybe<IntFilterInput>;
  agility?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentStatsPhysicalStatsFiltersInput>>>;
  balance?: InputMaybe<IntFilterInput>;
  jumping_reach?: InputMaybe<IntFilterInput>;
  natural_fitness?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentStatsPhysicalStatsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentStatsPhysicalStatsFiltersInput>>>;
  pace?: InputMaybe<IntFilterInput>;
  stamina?: InputMaybe<IntFilterInput>;
  strength?: InputMaybe<IntFilterInput>;
};

export type ComponentStatsPhysicalStatsInput = {
  acceleration?: InputMaybe<Scalars['Int']['input']>;
  agility?: InputMaybe<Scalars['Int']['input']>;
  balance?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  jumping_reach?: InputMaybe<Scalars['Int']['input']>;
  natural_fitness?: InputMaybe<Scalars['Int']['input']>;
  pace?: InputMaybe<Scalars['Int']['input']>;
  stamina?: InputMaybe<Scalars['Int']['input']>;
  strength?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentStatsTechnicalStats = {
  __typename?: 'ComponentStatsTechnicalStats';
  corners?: Maybe<Scalars['Int']['output']>;
  crossing?: Maybe<Scalars['Int']['output']>;
  dribbling?: Maybe<Scalars['Int']['output']>;
  finishing?: Maybe<Scalars['Int']['output']>;
  first_touch?: Maybe<Scalars['Int']['output']>;
  free_kick_taking?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  long_shots?: Maybe<Scalars['Int']['output']>;
  long_throws?: Maybe<Scalars['Int']['output']>;
  marking?: Maybe<Scalars['Int']['output']>;
  passing?: Maybe<Scalars['Int']['output']>;
  penalty_taking?: Maybe<Scalars['Int']['output']>;
  tackling?: Maybe<Scalars['Int']['output']>;
  technique?: Maybe<Scalars['Int']['output']>;
};

export type ComponentStatsTechnicalStatsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentStatsTechnicalStatsFiltersInput>>>;
  corners?: InputMaybe<IntFilterInput>;
  crossing?: InputMaybe<IntFilterInput>;
  dribbling?: InputMaybe<IntFilterInput>;
  finishing?: InputMaybe<IntFilterInput>;
  first_touch?: InputMaybe<IntFilterInput>;
  free_kick_taking?: InputMaybe<IntFilterInput>;
  heading?: InputMaybe<IntFilterInput>;
  long_shots?: InputMaybe<IntFilterInput>;
  long_throws?: InputMaybe<IntFilterInput>;
  marking?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentStatsTechnicalStatsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentStatsTechnicalStatsFiltersInput>>>;
  passing?: InputMaybe<IntFilterInput>;
  penalty_taking?: InputMaybe<IntFilterInput>;
  tackling?: InputMaybe<IntFilterInput>;
  technique?: InputMaybe<IntFilterInput>;
};

export type ComponentStatsTechnicalStatsInput = {
  corners?: InputMaybe<Scalars['Int']['input']>;
  crossing?: InputMaybe<Scalars['Int']['input']>;
  dribbling?: InputMaybe<Scalars['Int']['input']>;
  finishing?: InputMaybe<Scalars['Int']['input']>;
  first_touch?: InputMaybe<Scalars['Int']['input']>;
  free_kick_taking?: InputMaybe<Scalars['Int']['input']>;
  heading?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  long_shots?: InputMaybe<Scalars['Int']['input']>;
  long_throws?: InputMaybe<Scalars['Int']['input']>;
  marking?: InputMaybe<Scalars['Int']['input']>;
  passing?: InputMaybe<Scalars['Int']['input']>;
  penalty_taking?: InputMaybe<Scalars['Int']['input']>;
  tackling?: InputMaybe<Scalars['Int']['input']>;
  technique?: InputMaybe<Scalars['Int']['input']>;
};

export type Country = {
  __typename?: 'Country';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CountryEntity = {
  __typename?: 'CountryEntity';
  attributes?: Maybe<Country>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CountryEntityResponse = {
  __typename?: 'CountryEntityResponse';
  data?: Maybe<CountryEntity>;
};

export type CountryEntityResponseCollection = {
  __typename?: 'CountryEntityResponseCollection';
  data: Array<CountryEntity>;
  meta: ResponseCollectionMeta;
};

export type CountryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CountryFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CountryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CountryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CountryInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = ComponentStatsMentalStats | ComponentStatsPhysicalStats | ComponentStatsTechnicalStats | Country | I18NLocale | Player | Team | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCountry?: Maybe<CountryEntityResponse>;
  createPlayer?: Maybe<PlayerEntityResponse>;
  createTeam?: Maybe<TeamEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCountry?: Maybe<CountryEntityResponse>;
  deletePlayer?: Maybe<PlayerEntityResponse>;
  deleteTeam?: Maybe<TeamEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCountry?: Maybe<CountryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updatePlayer?: Maybe<PlayerEntityResponse>;
  updateTeam?: Maybe<TeamEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateCountryArgs = {
  data: CountryInput;
};


export type MutationCreatePlayerArgs = {
  data: PlayerInput;
};


export type MutationCreateTeamArgs = {
  data: TeamInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCountryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateCountryArgs = {
  data: CountryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdatePlayerArgs = {
  data: PlayerInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTeamArgs = {
  data: TeamInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Player = {
  __typename?: 'Player';
  birthdate: Scalars['Date']['output'];
  country?: Maybe<CountryEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  mental_stats?: Maybe<ComponentStatsMentalStats>;
  photo: UploadFileEntityResponse;
  physical_stats?: Maybe<ComponentStatsPhysicalStats>;
  position?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  team?: Maybe<TeamEntityResponse>;
  technical_stats?: Maybe<ComponentStatsTechnicalStats>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PlayerEntity = {
  __typename?: 'PlayerEntity';
  attributes?: Maybe<Player>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PlayerEntityResponse = {
  __typename?: 'PlayerEntityResponse';
  data?: Maybe<PlayerEntity>;
};

export type PlayerEntityResponseCollection = {
  __typename?: 'PlayerEntityResponseCollection';
  data: Array<PlayerEntity>;
  meta: ResponseCollectionMeta;
};

export type PlayerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PlayerFiltersInput>>>;
  birthdate?: InputMaybe<DateFilterInput>;
  country?: InputMaybe<CountryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  first_name?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  last_name?: InputMaybe<StringFilterInput>;
  mental_stats?: InputMaybe<ComponentStatsMentalStatsFiltersInput>;
  not?: InputMaybe<PlayerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PlayerFiltersInput>>>;
  physical_stats?: InputMaybe<ComponentStatsPhysicalStatsFiltersInput>;
  position?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  team?: InputMaybe<TeamFiltersInput>;
  technical_stats?: InputMaybe<ComponentStatsTechnicalStatsFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PlayerInput = {
  birthdate?: InputMaybe<Scalars['Date']['input']>;
  country?: InputMaybe<Scalars['ID']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  mental_stats?: InputMaybe<ComponentStatsMentalStatsInput>;
  photo?: InputMaybe<Scalars['ID']['input']>;
  physical_stats?: InputMaybe<ComponentStatsPhysicalStatsInput>;
  position?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  team?: InputMaybe<Scalars['ID']['input']>;
  technical_stats?: InputMaybe<ComponentStatsTechnicalStatsInput>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  countries?: Maybe<CountryEntityResponseCollection>;
  country?: Maybe<CountryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  player?: Maybe<PlayerEntityResponse>;
  players?: Maybe<PlayerEntityResponseCollection>;
  team?: Maybe<TeamEntityResponse>;
  teams?: Maybe<TeamEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCountriesArgs = {
  filters?: InputMaybe<CountryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCountryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPlayerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPlayersArgs = {
  filters?: InputMaybe<PlayerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTeamArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTeamsArgs = {
  filters?: InputMaybe<TeamFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Team = {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TeamEntity = {
  __typename?: 'TeamEntity';
  attributes?: Maybe<Team>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TeamEntityResponse = {
  __typename?: 'TeamEntityResponse';
  data?: Maybe<TeamEntity>;
};

export type TeamEntityResponseCollection = {
  __typename?: 'TeamEntityResponseCollection';
  data: Array<TeamEntity>;
  meta: ResponseCollectionMeta;
};

export type TeamFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TeamFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TeamFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TeamFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TeamInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type PlayerFragment = { __typename: 'PlayerEntity', id?: string | null, attributes?: { __typename?: 'Player', first_name: string, last_name: string, birthdate: any, position?: string | null, technical_stats?: { __typename?: 'ComponentStatsTechnicalStats', corners?: number | null, crossing?: number | null, dribbling?: number | null, finishing?: number | null, first_touch?: number | null, free_kick_taking?: number | null, heading?: number | null, long_shots?: number | null, long_throws?: number | null, marking?: number | null, passing?: number | null, penalty_taking?: number | null, tackling?: number | null, technique?: number | null } | null, mental_stats?: { __typename?: 'ComponentStatsMentalStats', aggression?: number | null, anticipation?: number | null, bravery?: number | null, composure?: number | null, concentration?: number | null, decisions?: number | null, determination?: number | null, flair?: number | null, leadership?: number | null, off_the_ball?: number | null, positioning?: number | null, teamwork?: number | null, vision?: number | null, work_rate?: number | null } | null, physical_stats?: { __typename?: 'ComponentStatsPhysicalStats', acceleration?: number | null, agility?: number | null, balance?: number | null, jumping_reach?: number | null, natural_fitness?: number | null, pace?: number | null, stamina?: number | null, strength?: number | null } | null, team?: { __typename?: 'TeamEntityResponse', data?: { __typename: 'TeamEntity', id?: string | null, attributes?: { __typename?: 'Team', name?: string | null } | null } | null } | null, country?: { __typename?: 'CountryEntityResponse', data?: { __typename: 'CountryEntity', id?: string | null, attributes?: { __typename?: 'Country', code?: string | null, name?: string | null } | null } | null } | null, photo: { __typename?: 'UploadFileEntityResponse', data?: { __typename: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, url: string } | null } | null } } | null };

export type FileFragment = { __typename: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, url: string } | null };

export type CountryFragment = { __typename: 'CountryEntity', id?: string | null, attributes?: { __typename?: 'Country', code?: string | null, name?: string | null } | null };

export type TeamFragment = { __typename: 'TeamEntity', id?: string | null, attributes?: { __typename?: 'Team', name?: string | null } | null };

export type TechnicalStatsFragment = { __typename?: 'ComponentStatsTechnicalStats', corners?: number | null, crossing?: number | null, dribbling?: number | null, finishing?: number | null, first_touch?: number | null, free_kick_taking?: number | null, heading?: number | null, long_shots?: number | null, long_throws?: number | null, marking?: number | null, passing?: number | null, penalty_taking?: number | null, tackling?: number | null, technique?: number | null };

export type MentalStatsFragment = { __typename?: 'ComponentStatsMentalStats', aggression?: number | null, anticipation?: number | null, bravery?: number | null, composure?: number | null, concentration?: number | null, decisions?: number | null, determination?: number | null, flair?: number | null, leadership?: number | null, off_the_ball?: number | null, positioning?: number | null, teamwork?: number | null, vision?: number | null, work_rate?: number | null };

export type PhysicalStatsFragment = { __typename?: 'ComponentStatsPhysicalStats', acceleration?: number | null, agility?: number | null, balance?: number | null, jumping_reach?: number | null, natural_fitness?: number | null, pace?: number | null, stamina?: number | null, strength?: number | null };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players?: { __typename?: 'PlayerEntityResponseCollection', data: Array<{ __typename: 'PlayerEntity', id?: string | null, attributes?: { __typename?: 'Player', first_name: string, last_name: string, birthdate: any, position?: string | null, technical_stats?: { __typename?: 'ComponentStatsTechnicalStats', corners?: number | null, crossing?: number | null, dribbling?: number | null, finishing?: number | null, first_touch?: number | null, free_kick_taking?: number | null, heading?: number | null, long_shots?: number | null, long_throws?: number | null, marking?: number | null, passing?: number | null, penalty_taking?: number | null, tackling?: number | null, technique?: number | null } | null, mental_stats?: { __typename?: 'ComponentStatsMentalStats', aggression?: number | null, anticipation?: number | null, bravery?: number | null, composure?: number | null, concentration?: number | null, decisions?: number | null, determination?: number | null, flair?: number | null, leadership?: number | null, off_the_ball?: number | null, positioning?: number | null, teamwork?: number | null, vision?: number | null, work_rate?: number | null } | null, physical_stats?: { __typename?: 'ComponentStatsPhysicalStats', acceleration?: number | null, agility?: number | null, balance?: number | null, jumping_reach?: number | null, natural_fitness?: number | null, pace?: number | null, stamina?: number | null, strength?: number | null } | null, team?: { __typename?: 'TeamEntityResponse', data?: { __typename: 'TeamEntity', id?: string | null, attributes?: { __typename?: 'Team', name?: string | null } | null } | null } | null, country?: { __typename?: 'CountryEntityResponse', data?: { __typename: 'CountryEntity', id?: string | null, attributes?: { __typename?: 'Country', code?: string | null, name?: string | null } | null } | null } | null, photo: { __typename?: 'UploadFileEntityResponse', data?: { __typename: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, url: string } | null } | null } } | null }> } | null };

export type PlayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PlayerQuery = { __typename?: 'Query', player?: { __typename?: 'PlayerEntityResponse', data?: { __typename: 'PlayerEntity', id?: string | null, attributes?: { __typename?: 'Player', first_name: string, last_name: string, birthdate: any, position?: string | null, technical_stats?: { __typename?: 'ComponentStatsTechnicalStats', corners?: number | null, crossing?: number | null, dribbling?: number | null, finishing?: number | null, first_touch?: number | null, free_kick_taking?: number | null, heading?: number | null, long_shots?: number | null, long_throws?: number | null, marking?: number | null, passing?: number | null, penalty_taking?: number | null, tackling?: number | null, technique?: number | null } | null, mental_stats?: { __typename?: 'ComponentStatsMentalStats', aggression?: number | null, anticipation?: number | null, bravery?: number | null, composure?: number | null, concentration?: number | null, decisions?: number | null, determination?: number | null, flair?: number | null, leadership?: number | null, off_the_ball?: number | null, positioning?: number | null, teamwork?: number | null, vision?: number | null, work_rate?: number | null } | null, physical_stats?: { __typename?: 'ComponentStatsPhysicalStats', acceleration?: number | null, agility?: number | null, balance?: number | null, jumping_reach?: number | null, natural_fitness?: number | null, pace?: number | null, stamina?: number | null, strength?: number | null } | null, team?: { __typename?: 'TeamEntityResponse', data?: { __typename: 'TeamEntity', id?: string | null, attributes?: { __typename?: 'Team', name?: string | null } | null } | null } | null, country?: { __typename?: 'CountryEntityResponse', data?: { __typename: 'CountryEntity', id?: string | null, attributes?: { __typename?: 'Country', code?: string | null, name?: string | null } | null } | null } | null, photo: { __typename?: 'UploadFileEntityResponse', data?: { __typename: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, url: string } | null } | null } } | null } | null } | null };

export const TechnicalStatsFragmentDoc = gql`
    fragment technicalStats on ComponentStatsTechnicalStats {
  corners
  crossing
  dribbling
  finishing
  first_touch
  free_kick_taking
  heading
  long_shots
  long_throws
  marking
  passing
  penalty_taking
  tackling
  technique
}
    `;
export const MentalStatsFragmentDoc = gql`
    fragment mentalStats on ComponentStatsMentalStats {
  aggression
  anticipation
  bravery
  composure
  concentration
  decisions
  determination
  flair
  leadership
  off_the_ball
  positioning
  teamwork
  vision
  work_rate
}
    `;
export const PhysicalStatsFragmentDoc = gql`
    fragment physicalStats on ComponentStatsPhysicalStats {
  acceleration
  agility
  balance
  jumping_reach
  natural_fitness
  pace
  stamina
  strength
}
    `;
export const TeamFragmentDoc = gql`
    fragment team on TeamEntity {
  __typename
  id
  attributes {
    name
  }
}
    `;
export const CountryFragmentDoc = gql`
    fragment country on CountryEntity {
  __typename
  id
  attributes {
    code
    name
  }
}
    `;
export const FileFragmentDoc = gql`
    fragment file on UploadFileEntity {
  __typename
  id
  attributes {
    name
    url
  }
}
    `;
export const PlayerFragmentDoc = gql`
    fragment player on PlayerEntity {
  __typename
  id
  attributes {
    first_name
    last_name
    birthdate
    position
    technical_stats {
      ...technicalStats
    }
    mental_stats {
      ...mentalStats
    }
    physical_stats {
      ...physicalStats
    }
    team {
      data {
        ...team
      }
    }
    country {
      data {
        ...country
      }
    }
    photo {
      data {
        ...file
      }
    }
  }
}
    ${TechnicalStatsFragmentDoc}
${MentalStatsFragmentDoc}
${PhysicalStatsFragmentDoc}
${TeamFragmentDoc}
${CountryFragmentDoc}
${FileFragmentDoc}`;
export const PlayersDocument = gql`
    query players {
  players {
    data {
      ...player
    }
  }
}
    ${PlayerFragmentDoc}`;
export const PlayerDocument = gql`
    query player($id: ID!) {
  player(id: $id) {
    data {
      ...player
    }
  }
}
    ${PlayerFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    players(variables?: PlayersQueryVariables, options?: C): Promise<PlayersQuery> {
      return requester<PlayersQuery, PlayersQueryVariables>(PlayersDocument, variables, options) as Promise<PlayersQuery>;
    },
    player(variables: PlayerQueryVariables, options?: C): Promise<PlayerQuery> {
      return requester<PlayerQuery, PlayerQueryVariables>(PlayerDocument, variables, options) as Promise<PlayerQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;