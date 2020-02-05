import moment from 'moment'

export function make_notification_titles (notification) {
    let result_text = '';
    switch (notification['type']) {
        case 'TaskAdded':
            result_text = `Альбом <a href="/tasks">${notification['parent']['task']['album_name']}</a> добавлен в загрузки`;
            break;
        case 'TaskComplited':
            result_text = `Альбом <a href="/tasks">${notification['parent']['task']['album_name']}</a> загружен`;
            break;
        case 'PlanChanged':
            result_text = `Тариф изменен на <b>${notification['parent']['subscription']['plan']['title']}</b>`;
    }
    return result_text
}

export function formatDate(value) {
    if (value) {
        return moment.unix(parseInt(value)).format('MMMM D, Y')
    }
    return 'неизвестно'
}

export function convertBytes(size_bytes) {
    let names_of_size = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if (size_bytes === 0) return "0B";

    let log_of_bytes = parseInt(Math.log(size_bytes) / Math.log(1000));
    let number = Math.round((size_bytes / Math.pow(1000, log_of_bytes)) * 100) / 100;

    return `${number} ${names_of_size[log_of_bytes]}`;
}