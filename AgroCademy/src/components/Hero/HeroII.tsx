import { motion } from "framer-motion";
let data = [
  `Knowledge Sharing: Farmer Hub acts as a knowledge-sharing platform, connecting farmers with industry experts, researchers, and fellow farmers. It facilitates the exchange of information, best practices, and practical insights through forums, discussion boards, and webinars. Farmers can access a vast repository of agricultural resources, including articles, guides, and videos.`,
  `Market Access: The platform enables farmers to expand their market reach by providing access to a wide network of buyers, distributors, and retailers. Farmers can showcase their products and connect with potential customers, negotiate contracts, and explore new market opportunities. This feature promotes transparency, fair trade, and better market prices for farmers.`,
  `Crop and Livestock Management: AgroCademy offers comprehensive tools and services to manage crop and livestock production effectively. Farmers can access real-time weather updates, crop disease alerts, and pest management solutions. They can also maintain digital records of their farming activities, track inventory, monitor livestock health, and optimize resource utilization.`,
  `Financial Support: The platform provides information about various financial schemes, grants, subsidies, and loans available for farmers. It helps them navigate the complex landscape of agricultural financing and assists in the application process. Farmer Hub may collaborate with financial institutions and government agencies to streamline access to credit and financial services for farmers.`,
  `Technology Integration: AgroCademy promotes the adoption of modern agricultural technologies and innovations. It offers guidance on precision farming techniques, IoT devices, drone applications, and data analytics to optimize farm operations. The platform may also feature a marketplace for agricultural machinery, equipment, and inputs, allowing farmers to explore and purchase the latest tools that suit their needs.`,
  `Training and Education: AgroCademy recognizes the importance of continuous learning and skills development. It provides online training programs, workshops, and courses on various aspects of farming, such as sustainable practices, organic farming, agribusiness management, and emerging trends. These educational resources empower farmers to adapt to evolving challenges and seize new opportunities.`,
];

export default function HeroII() {
  return (
    <section className="grid sm:grid-cols-3 grid-cols-1 sm:w-[85%] mx-auto w-[95%]">
      {data.map((item, index: number) => {
        let [head, body] = item.split(":");
        return (
          <motion.div
            className="flex flex-col justify-center p-3 group relative w-full"
            key={index}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1, transition: { ease: "easeInOut", duration: 1 } }}
          >
            {/* <i className="fa text-5xl text-white self-center group-hover:z-0">&#xf1a8;</i> */}
            <div className="rounded shadow p-3 flex flex-col items-center bg-white" key={index}>
              <p className="text-center font-scope text-xl font-semibold">{head}</p>
              <p className="text-sm text-center font-scope">{body}</p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
