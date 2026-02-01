FROM node:24-slim AS deps

WORKDIR /app

# Playwrightに必要なライブラリ
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    wget \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 依存関係だけ先にコピー（キャッシュ最適化）
COPY package.json yarn.lock ./

RUN yarn install

FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=development

# Playwright動作用ライブラリを引き継ぐ
COPY --from=deps /usr /usr

# node_modulesを引き継ぐ
COPY --from=deps /app/node_modules ./node_modules

# ソースコード
COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
