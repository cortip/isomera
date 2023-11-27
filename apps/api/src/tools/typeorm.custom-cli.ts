#!/usr/bin/env node
import { register } from 'ts-node'

register({ transpileOnly: true })

import 'typeorm/cli'
