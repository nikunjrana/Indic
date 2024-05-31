import makeRequest from './RequestsHandler/makeRequest'
export default function getMsgCount() {
    return makeRequest('POST', '/ajaxrequest/identified/messages/unreadMessage', {}, '', '', true)
}