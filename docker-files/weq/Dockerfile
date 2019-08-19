FROM elixir:1.9.0

ENV MIX_ENV dev

WORKDIR /app

RUN apt-get update && \
    mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install hex phx_new 1.4.9 --force && \
    apt-get install -y inotify-tools && \
    git clone https://github.com/w-toguchi83/weq.git && \
    cd weq && \
    mix deps.get && \
    mix compile

WORKDIR /app/weq

EXPOSE 4000

ENTRYPOINT ["mix", "phx.server"]
