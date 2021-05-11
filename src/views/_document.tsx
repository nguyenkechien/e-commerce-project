import React from 'react';
import {
  Document,
  Head,
  Main,
} from '@react-ssr/nestjs-express';

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <title>E-commerce project</title>
        </Head>
        <body>
          <Main />
        </body>
      </html>
    );
  }
};
