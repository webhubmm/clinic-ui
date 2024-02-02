import ButtonSecondary from "@/components/common/button/ButtonSecondary";
import Card from "@/components/common/card/Card";
import Container from "@/components/common/container/Container";
import Text from "@/components/common/text/Text";
import TextSmall from "@/components/common/text/TextSmall";
import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import provideDentalCareImg from "@/public/assets/asset 8.webp";
import HeadingLarge from "@/components/common/headings/HeadingLarge";
import Heading from "@/components/common/headings/Heading";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { Checkbox } from "@chakra-ui/checkbox";
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
const BookAppointment = () => {
  return (
    <section className=" bg-neat-pearlwhite py-10">
      <Container>
        <div className="flex justify-between gap-10">
          <div className="space-y-8 flex-1">
            <Card bgColor="bg-neat-primary">
              <div className="flex items-start gap-5">
                <div className=" bg-white text-neat-primary p-4 rounded-full">
                  <FaPhone size="20" />
                </div>
                <div className="text-white space-y-2">
                  <TextSmall>Call us for emergency</TextSmall>
                  <TextSmall>1800-749-8000</TextSmall>
                </div>
              </div>
            </Card>
            <Card>
              <div className="space-y-8">
                <TextSmall color="text-neat-primary">What we do</TextSmall>
                <div className=" text-neat-secondary w-[80%]">
                  <Heading>Provide genuine dental care</Heading>
                </div>
                <div className="flex gap-3">
                  <div className="space-y-20">
                    <TextSmall color="text-gray">
                      We offer a comprehensive range of dental services to help
                      you achieve optimal oral health and a beautiful smile. Our
                      team of experienced.
                    </TextSmall>
                    <ButtonSecondary placeholder="Learn more"></ButtonSecondary>
                  </div>
                  <Image
                    src={provideDentalCareImg}
                    className=" object-contain"
                    alt="providing dental care image"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-1">
            <Card>
              <div className="space-y-10">
                <div className=" text-neat-secondary">
                  <Heading>Book an appointment</Heading>
                </div>
                <TextSmall color="text-neat-secondary">
                  Get your dental health back on track with us
                </TextSmall>
                <form action="" className="space-y-5">
                  <div className="flex justify-between gap-10">
                    <div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="First Name"
                          padding={8}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          padding={8}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        padding={8}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl>
                      <Input type="tel" placeholder="Phone" padding={8} />
                    </FormControl>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                      <FormControl>
                        <Input type="date" placeholder="Date" />
                      </FormControl>
                    </div>
                  </div>
                  <div className="mb-10">
                    <FormControl>
                      <Textarea placeholder="Message" />
                    </FormControl>
                  </div>
                  <div className="flex justify-between items-center">
                    <Checkbox>Email subscribe</Checkbox>
                    <ButtonPrimary placeholder="Book Now"></ButtonPrimary>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookAppointment;
