// express.adapter.ts
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

export function createExpressAdapter() {
    return new ExpressAdapter(express());
}
