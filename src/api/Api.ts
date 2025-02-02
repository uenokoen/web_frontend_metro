/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import Cookies from "js-cookie";

export interface RoutePic {
  /**
   * Миниатюра
   * @format uri
   * @maxLength 200
   */
  thumbnail?: string | null;
}

export interface UserAuth {
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface UserRegistration {
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 8
   */
  password: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
}

export interface UserUpdate {
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;

  new_password?: string;

  confirm_password?: string
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";
import {RouteUpdate} from "../../tripDraftSlice.ts";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): {
      data?: any;
      auth?: axios.AxiosBasicCredentials;
      httpsAgent?: any;
      transformRequest?: axios.AxiosRequestTransformer | axios.AxiosRequestTransformer[];
      insecureHTTPParser?: boolean;
      onDownloadProgress?: ((progressEvent: axios.AxiosProgressEvent) => void) | {
          (progressEvent: AxiosProgressEvent): void;
          (progressEvent: axios.AxiosProgressEvent): void
      };
      withXSRFToken?: boolean | ((config: axios.InternalAxiosRequestConfig) => (boolean | undefined));
      timeout?: axios.Milliseconds;
      maxBodyLength?: number;
      paramsSerializer?: axios.ParamsSerializerOptions | axios.CustomParamsSerializer;
      responseType?: axios.ResponseType;
      decompress?: boolean;
      transitional?: axios.TransitionalOptions;
      httpAgent?: any;
      onUploadProgress?: ((progressEvent: axios.AxiosProgressEvent) => void) | {
          (progressEvent: AxiosProgressEvent): void;
          (progressEvent: axios.AxiosProgressEvent): void
      };
      signal?: axios.GenericAbortSignal;
      transformResponse?: axios.AxiosResponseTransformer | axios.AxiosResponseTransformer[];
      maxRedirects?: number;
      formSerializer?: axios.FormSerializerOptions;
      lookup?: ((hostname: string, options: object, cb: (err: (Error | null), address: (axios.LookupAddress | axios.LookupAddress[]), family?: axios.AddressFamily) => void) => void) | ((hostname: string, options: object) => Promise<[address: axios.LookupAddressEntry | axios.LookupAddressEntry[], family: axios.AddressFamily | undefined] | axios.LookupAddress>);
      headers: {
          Accept?: axios.AxiosHeaderValue | any;
          "User-Agent"?: axios.AxiosHeaderValue | any;
          link?: AxiosHeaders | any;
          purge?: AxiosHeaders | any;
          delete?: AxiosHeaders | ((header: (string | string[]), matcher?: AxiosHeaderMatcher) => boolean);
          put?: AxiosHeaders | any;
          Authorization?: axios.AxiosHeaderValue | any;
          head?: AxiosHeaders | any;
          patch?: AxiosHeaders | any;
          post?: AxiosHeaders | any;
          unlink?: AxiosHeaders | any;
          common?: AxiosHeaders | any;
          get?: AxiosHeaders | {
              (headerName: string, parser: RegExp): (RegExpExecArray | null);
              (headerName: string, matcher?: (true | AxiosHeaderParser)): AxiosHeaderValue
          };
          "Content-Encoding"?: axios.AxiosHeaderValue | any;
          options?: AxiosHeaders | any;
          "Content-Length"?: axios.AxiosHeaderValue | any;
          "Content-Type"?: ContentType | any
      };
      maxContentLength?: number;
      adapter?: axios.AxiosAdapterConfig | axios.AxiosAdapterConfig[];
      socketPath?: string | null;
      method?: axios.Method | string;
      validateStatus?: ((status: number) => boolean) | null;
      responseEncoding?: axios.responseEncoding | string;
      cancelToken?: axios.CancelToken;
      maxRate?: number | [axios.MaxUploadRate, axios.MaxDownloadRate];
      transport?: any;
      params?: any;
      timeoutErrorMessage?: string;
      env?: { FormData?: { new(...args: any[]): object } };
      url?: string;
      xsrfCookieName?: string;
      beforeRedirect?: ((options: Record<string, any>, responseDetails: {
          headers: Record<string, string>;
          statusCode: HttpStatusCode
      }) => void) | {
          (options: Record<string, any>, responseDetails: {
              headers: Record<string, string>;
              statusCode: HttpStatusCode
          }): void;
          (options: Record<string, any>, responseDetails: {
              headers: Record<string, string>;
              statusCode: HttpStatusCode
          }): void
      };
      proxy?: axios.AxiosProxyConfig | false;
      baseURL?: string;
      withCredentials?: boolean;
      family?: axios.AddressFamily;
      xsrfHeaderName?: string;
      fetchOptions?: Record<string, any>
  } {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {

    const csrfToken = Cookies.get('csrftoken');
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  routes = {
    /**
     * @description GET /api/routes/
     *
     * @tags routes
     * @name RoutesList
     * @request GET:/routes/
     * @secure
     */
    routesList: (query: {
        origin: string;
    },params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesCreate
     * @request POST:/routes/
     * @secure
     */
    routesCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description GET /api/routes/<id>/
     *
     * @tags routes
     * @name RoutesRead
     * @request GET:/routes/{route_id}/
     * @secure
     */
    routesRead: (routeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesUpdate
     * @request PUT:/routes/{route_id}/
     * @secure
     */
    routesUpdate: (routeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesDelete
     * @request DELETE:/routes/{route_id}/
     * @secure
     */
    routesDelete: (routeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesDrafttripCreate
     * @request POST:/routes/{route_id}/drafttrip/
     * @secure
     */
    routesDrafttripCreate: (routeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/drafttrip/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesImageCreate
     * @summary add pic
     * @request POST:/routes/{route_id}/image/
     * @secure
     */
    routesImageCreate: (routeId: string, data: RoutePic, params: RequestParams = {}) =>
      this.request<RoutePic, any>({
        path: `/routes/${routeId}/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesTripUpdate
     * @request PUT:/routes/{route_id}/trip/
     * @secure
     */
    routesTripUpdate: (routeId: string,body: RouteUpdate, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/trip/`,
        method: "PUT",
        secure: true,
        body: body,
        ...params,
      }),

    /**
     * No description
     *
     * @tags routes
     * @name RoutesTripDelete
     * @request DELETE:/routes/{route_id}/trip/
     * @secure
     */
    routesTripDelete: (routeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/routes/${routeId}/trip/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  trips = {
    /**
     * No description
     *
     * @tags trips
     * @name TripsList
     * @request GET:/trips/
     * @secure
     */
    tripsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags trips
     * @name TripsRead
     * @request GET:/trips/{trip_id}/
     * @secure
     */
    tripsRead: (tripId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/${tripId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags trips
     * @name TripsUpdate
     * @request PUT:/trips/{trip_id}/
     * @secure
     */
    tripsUpdate: (tripId: string, body: {
        name: string,
        description: string,
        owner: string
    }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/${tripId}/`,
        method: "PUT",
        secure: true,
        body: body,
        ...params,
      }),

    /**
     * No description
     *
     * @tags trips
     * @name TripsDelete
     * @request DELETE:/trips/{trip_id}/
     * @secure
     */
    tripsDelete: (tripId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/${tripId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description POST /trips/<id>/finish/ Завершение или отклонение заявки модератором.
     *
     * @tags trips
     * @name TripsFinishCreate
     * @request POST:/trips/{trip_id}/finish/
     * @secure
     */
    tripsFinishCreate: (tripId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/${tripId}/finish/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description PUT /trips/<id>/form/ Формирование заявки создателем.
     *
     * @tags trips
     * @name TripsFormCreate
     * @request POST:/trips/{trip_id}/form/
     * @secure
     */
    tripsFormCreate: (tripId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trips/${tripId}/form/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * @description POST /users/auth/ Авторизация.
     *
     * @tags users
     * @name UsersAuthCreate
     * @request POST:/users/auth/
     * @secure
     */
    usersAuthCreate: (data: UserAuth, params: RequestParams = {}) =>
      this.request<UserAuth, any>({
        path: `/users/auth/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description POST /users/deauth/ Деавторизация.
     *
     * @tags users
     * @name UsersDeauthCreate
     * @request POST:/users/deauth/
     * @secure
     */
    usersDeauthCreate: ( params: RequestParams = {}) =>
      this.request<void,any>({
        path: `/users/deauth/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description POST /users/register/ Регистрация нового пользователя.
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegistration, params: RequestParams = {}) =>
      this.request<UserRegistration, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description PUT /users/update/ Изменение данных пользователя.
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: UserUpdate, params: RequestParams = {}) =>
      this.request<UserUpdate, any>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
