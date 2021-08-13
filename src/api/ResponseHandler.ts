export const ResponseHandler = (response: any) => {
  const { ok: isResponseOk = false, status: responseStatus = 200 } = response;

  if (isResponseOk) {
    if (responseStatus === 204) {
      return response;
    }
    return response.json();
  }

  throw response;
};

export const ErrorHandler = async (error: any = {}): Promise<any> => {
  const { status: errorStatus = 401 } = error;

  if (errorStatus === 401) {
    return [];
  }

  if (error instanceof TypeError) {
    return [];
  }

  return [];
};
