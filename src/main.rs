use actix_files as fs;
use actix_web::{App, HttpServer, middleware};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("Starting server at http://0.0.0.0:5000");

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            // Serve index.html for the root path
            .service(fs::Files::new("/", ".").index_file("index.html"))
    })
    .bind(("0.0.0.0", 5000))?
    .run()
    .await
}
