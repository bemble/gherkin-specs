(() => {
  featureSteps(/^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/)
    .given(/^a global administrator named "([^"]+)"$/, (arg1:any) => {})
    .given(/^a blog named "([^"]+)"$/, (arg1:any) => {})
    .given(/^a customer named "([^"]+)"$/, (arg1:any) => {})
    .given(/^a blog named "([^"]+)" owned by "([^"]+)"$/, (arg1:any, arg2:any) => {})
    .given(/^I am logged in as Dr. Bill$/, () => {})
    .when(/^I try to post to "([^"]+)"$/, (arg1:any) => {})
    .then(/^I should see "([^"]+)"$/, (arg1:any) => {})
    .given(/^I should see "([^"]+)"$/, (arg1:any) => {})
    .given(/^I am logged in as Greg$/, () => {})
})();