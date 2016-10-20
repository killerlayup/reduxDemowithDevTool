
export const logger1 = ({getState}) => (next) => (action) => {
    console.log('[来自logger1]:发送了action:', action);
    let result = next(action);
    console.log('[来自logger1]:发送了action:', getState());
    return result;
};

export const logger2 = ({getState}) => (next) => (action) => {
    console.log('[来自logger2]:发送了action:', action);
    try {
        var result = next(action);
    } catch (error) {
        console.log('[来自logger2]:捕获到了一个错误: ', error);
    }
    console.log('[来自logger2]:发送了action:', getState());
    return result;
};