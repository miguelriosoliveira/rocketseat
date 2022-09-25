defmodule Nlw07HeatTags.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Nlw07HeatTags.Repo,
      # Start the Telemetry supervisor
      Nlw07HeatTagsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Nlw07HeatTags.PubSub},
      # Start the Endpoint (http/https)
      Nlw07HeatTagsWeb.Endpoint,
      # Start a worker by calling: Nlw07HeatTags.Worker.start_link(arg)
      # {Nlw07HeatTags.Worker, arg}
			Nlw07HeatTags.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Nlw07HeatTags.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    Nlw07HeatTagsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
