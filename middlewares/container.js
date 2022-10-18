class Request {
  constructor(req) {
    this.data = req;
  }

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
}

module.exports = Request;
