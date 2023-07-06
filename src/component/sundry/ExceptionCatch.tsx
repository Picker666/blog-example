import { useEffect } from 'react';

const ExceptionCatch = () => {
  const handleError = (error) => {
    console.log('=======error event: ', error);
  };
  const handleUnhandledrejection = (event) => {
    console.log('unhandledrejection event=======: ', event);
    event.preventDefault();
  };

  useEffect(() => {
    // 可以捕获 常规运行时的错误，异步错误，不能捕获语法错误和资源错误
    window.onerror = (message, source, lineno, colno, error) => {
      console.log('message, source, lineno, colno, error: ', message, source, lineno, colno, error);
    };
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleUnhandledrejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledrejection);
    };
  }, []);

  const promiseHandle = () => {
    new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   // console.log(b);
      //   reject(99);
      // }, 1000);
      console.log(b);
    }).then(
      (value) => {
        console.log('promise 成功了', value);
      }
      // (err) => {
      //   console.log('err: ', err);
      // }
      // ).catch(
      //   err => {
      //     console.log('promise.catch === err: ', err);
      //   }
    );
  };

  const sourceCall = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.test.com/';
    document.body.appendChild(script);
  };

  const tryCatchTesting = () => {
    // 1、常规运行时错误，可以捕获
    // try {
    //   let a;
    //   if (a.length) {
    //     console.log('1、a.length , ==== 666');
    //   }
    // } catch (error) {
    //   console.log('1、a.length 异常, ====', error);
    // }
    let c;
    console.log('====', c.length);

    // 2、语法错误，不能捕获
    // try {
    //   const b;
    // } catch (error) {
    //   console.log('2、b 异常, ====', error);
    // }

    // 3、异步错误，不能捕获
    // try {
    //   setTimeout(() => {
    //     console.log(a);
    //   }, 0);
    // } catch (error) {
    //   console.log('3、异常捕获', error);
    // }

    // sourceCall();

    // promiseHandle();
  };

  const asyncTesting = async () => {
    const val = await (async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // console.log(b);
          reject(99);
        }, 1000);
      });
    })();

    console.log(val, '====');
  };

  return (
    <div>
      <p>
        <button onClick={tryCatchTesting}>tryCatch</button>
        <button onClick={asyncTesting}>asyncTesting</button>
      </p>
    </div>
  );
};

export default ExceptionCatch;
