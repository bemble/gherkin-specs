(() => {
  featureSteps(/^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/)
    .given(/^a global administrator named "([^"]+)"$/, (arg1) => {})
    .given(/^a blog named "([^"]+)"$/, (arg1) => {})
    .given(/^a customer named "([^"]+)"$/, (arg1) => {})
    .given(/^a blog named "([^"]+)" owned by "([^"]+)"$/, (arg1, arg2) => {})
    .given(/^I am logged in as Dr. Bill$/, () => {})
    .when(/^I try to post to "([^"]+)"$/, (arg1) => {})
    .then(/^I should see "([^"]+)"$/, (arg1) => {})
    .given(/^I should see "([^"]+)"$/, (arg1) => {})
    .given(/^I am logged in as Greg$/, () => {})
})();