#!/bin/bash

# 替换为你的 Cloudflare Pages 项目名称
PROJECT_NAME="blueskyai"

# 替换为你的环境 (例如: preview, production, development)
# 如果不指定 --env，默认添加到 "Production" 和 "Preview" 环境
# 如果你想添加到 Development 环境 (用于 `wrangler pages dev`)，可以设置为 development
#TARGET_ENV="production" # 或者 "preview" 或 "development"

ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
    echo "错误：找不到 $ENV_FILE 文件。"
    exit 1
fi

echo "开始上传 $ENV_FILE 中的环境变量到 Cloudflare Pages 项目 '$PROJECT_NAME' 的 '$TARGET_ENV' 环境..."

# 逐行读取 .env.local 文件
while IFS='=' read -r key value; do
    # 忽略空行和注释
    if [[ -z "$key" || "$key" =~ ^# ]]; then
        continue
    fi

    # 移除值两端的引号 (如果存在)
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')

    echo "正在上传变量: $key"
    # 使用 wrangler 命令设置环境变量
    # --env 标志指定了环境变量将应用到的环境
    wrangler pages project env add "$key" --value "$value" --project-name "$PROJECT_NAME" --env "$TARGET_ENV"
    if [ $? -ne 0 ]; then
        echo "警告：上传变量 $key 失败。可能该变量已存在或权限问题。"
    fi
done < "$ENV_FILE"

echo "所有环境变量上传完成（或尝试完成）。"
echo "请前往 Cloudflare Pages Dashboard 确认。"