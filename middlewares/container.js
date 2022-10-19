class Request {
  constructor(req) {
    this.data = req;
  }

  getNotificationId = () => {
    console.log(this.data.params);
    const { notificationId } = this.data.params;
    return notificationId;
  };

  getSearchList = () => {
    const { search } = this.data.body;
    const result = search
      .trim()
      .split(" ")
      .filter((val) => {
        return val !== "";
      });
    return result;
  };

  getCompanyName = () => {
    const { companyName } = this.data.body;
    return companyName;
  };

  getUserEmail = () => {
    const { email } = this.data.body;
    return email;
  };

  getNotificationData = () => {
    const { companyId, position, reward, stack, region, nation, description } =
      this.data.body;

    const notificationData = {
      companyId,
      position,
      reward,
      stack,
      region,
      nation,
      description,
    };

    return notificationData;
  };

  getNotificationUpdateData = () => {
    const value = this.getNotificationData();
    const result = {};
    for (let i in value) {
      if (i) {
        result[i] = value[i];
      }
    }
    return result;
  };

  getUserIdAndNotificationId = () => {
    const { userId, notificationId } = this.data.body;
    return { userId, notificationId };
  };
}

module.exports = Request;
